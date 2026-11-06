import type { LookupAddress } from 'node:dns';
import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { JOB_IMPORT_LIMITS } from '@/lib/job-import/types';
import { isPrivateAddress, validateUrlShape } from '@/lib/job-import/parse';

async function assertPublicHost(url: URL): Promise<void> {
  const hostname = url.hostname.replace(/^\[/, '').replace(/\]$/, '');

  if (isIP(hostname)) {
    if (isPrivateAddress(hostname)) {
      throw new Error('Solo se permiten URLs públicas.');
    }
    return;
  }

  let records: LookupAddress[];

  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error('No pudimos resolver el dominio de la URL.');
  }

  if (!records.length) {
    throw new Error('No pudimos resolver el dominio de la URL.');
  }

  if (records.some((record) => isPrivateAddress(record.address))) {
    throw new Error('Solo se permiten URLs públicas.');
  }
}

export async function validatePublicUrl(input: string): Promise<URL> {
  const url = validateUrlShape(input);
  await assertPublicHost(url);
  return url;
}

async function readLimitedText(response: Response): Promise<string> {
  if (!response.body) return '';

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      received += value.byteLength;

      if (received > JOB_IMPORT_LIMITS.maxResponseBytes) {
        await reader.cancel();
        throw new Error('La página es demasiado grande.');
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString(
    'utf8',
  );
}

export async function fetchJobPage(
  input: string,
): Promise<{ html: string; finalUrl: string }> {
  let currentUrl = await validatePublicUrl(input);

  for (
    let redirectCount = 0;
    redirectCount <= JOB_IMPORT_LIMITS.maxRedirects;
    redirectCount += 1
  ) {
    let response: Response;

    try {
      response = await fetch(currentUrl, {
        redirect: 'manual',
        signal: AbortSignal.timeout(JOB_IMPORT_LIMITS.timeoutMs),
        headers: {
          'user-agent':
            'JobTrackerImport/1.0 (+https://www.jobtracker.com.ar)',
          accept:
            'text/html,application/xhtml+xml;q=0.9,text/plain;q=0.5,*/*;q=0.1',
          'accept-language': 'es-AR,es;q=0.9,en;q=0.8',
        },
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new Error('La página tardó demasiado en responder.');
      }
      throw new Error('No pudimos acceder a esa URL.');
    }

    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');

      if (!location) {
        throw new Error('La página devolvió una redirección inválida.');
      }

      if (redirectCount === JOB_IMPORT_LIMITS.maxRedirects) {
        throw new Error('La página redirige demasiadas veces.');
      }

      currentUrl = await validatePublicUrl(
        new URL(location, currentUrl).toString(),
      );
      continue;
    }

    if (!response.ok) {
      throw new Error(`La página respondió con un error ${response.status}.`);
    }

    const contentType = (
      response.headers.get('content-type') ?? ''
    ).toLowerCase();

    if (
      contentType &&
      !contentType.includes('text/html') &&
      !contentType.includes('application/xhtml+xml')
    ) {
      throw new Error('La URL no parece ser una página de empleo.');
    }

    return {
      html: await readLimitedText(response),
      finalUrl: currentUrl.toString(),
    };
  }

  throw new Error('La página redirige demasiadas veces.');
}
