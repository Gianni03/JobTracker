import { isIP } from 'node:net';
import type {
  Application,
  ApplicationCurrency,
  ApplicationSalaryFrequency,
} from '@/lib/definitions';
import {
  JOB_BOARD_HOSTS,
  JOB_BOARD_NAME_KEYWORDS,
  JOB_IMPORT_LIMITS,
  SUPPORTED_SALARY_CURRENCIES,
  type ImportedJob,
} from '@/lib/job-import/types';

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function fromCodePoint(value: number): string {
  try {
    return String.fromCodePoint(value);
  } catch {
    return '';
  }
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, decimal: string) =>
      fromCodePoint(Number.parseInt(decimal, 10)),
    )
    .replace(/&([a-z]+);/gi, (match, name: string) => {
      return NAMED_ENTITIES[name.toLowerCase()] ?? match;
    });
}

export function stripHtml(value: string): string {
  return decodeHtmlEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function parseAttributes(tag: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const attributeRe =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  let match: RegExpExecArray | null;

  while ((match = attributeRe.exec(tag))) {
    const name = match[1].toLowerCase();
    attributes[name] = decodeHtmlEntities(
      match[2] ?? match[3] ?? match[4] ?? '',
    );
  }

  return attributes;
}

export function extractMetaTags(html: string): Record<string, string> {
  const meta: Record<string, string> = {};

  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = parseAttributes(tag);
    const key = (attributes.property ?? attributes.name ?? '').toLowerCase();

    if (key && attributes.content) {
      meta[key] = attributes.content.trim();
    }
  }

  return meta;
}

export function extractTitle(html: string): string | undefined {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return match ? stripHtml(match[1]) : undefined;
}

export function extractJsonLd(html: string): unknown[] {
  const values: unknown[] = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptRe.exec(html))) {
    if (!/type\s*=\s*["']application\/ld\+json["']/i.test(match[1])) {
      continue;
    }

    try {
      values.push(JSON.parse(match[2].trim()));
    } catch {
      // Ignore malformed JSON-LD blocks; OpenGraph is still usable.
    }
  }

  return values;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/[^\d.,]/g, '').replace(/,/g, '');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function hasType(value: unknown, expected: string): boolean {
  const types = Array.isArray(value) ? value : [value];
  return types.some(
    (type) => typeof type === 'string' && type.toLowerCase() === expected,
  );
}

export function findJobPosting(
  value: unknown,
  depth = 0,
): Record<string, unknown> | null {
  if (depth > 5 || value === null || value === undefined) {
    return null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findJobPosting(item, depth + 1);
      if (found) return found;
    }
    return null;
  }

  const record = asRecord(value);
  if (!record) return null;

  if (hasType(record['@type'], 'jobposting')) {
    return record;
  }

  for (const key of ['@graph', 'mainEntity', 'itemListElement']) {
    const found = findJobPosting(record[key], depth + 1);
    if (found) return found;
  }

  return null;
}

function cleanTitle(raw: string): string {
  const suffixes = [
    /\s*[|·]\s*linkedin\s*$/i,
    /\s*[-–—|]\s*linkedin\s*$/i,
    /\s*[|·]\s*indeed\s*$/i,
    /\s*[|·]\s*getonboard\s*$/i,
    /\s*[|·]\s*computrabajo\s*$/i,
    /\s*[|·]\s*glassdoor\s*$/i,
    /\s*[|·]\s*remoteok\s*$/i,
    /\s*[|·]\s*wellfound\s*$/i,
    /\s*[|·]\s*bumeran\s*$/i,
    /\s*[|·]\s*zonajobs\s*$/i,
  ];

  let value = stripHtml(raw);
  for (const suffix of suffixes) {
    value = value.replace(suffix, '').trim();
  }

  return value;
}

export function splitTitle(raw: string): { role?: string; company?: string } {
  const title = cleanTitle(raw);
  if (!title) return {};

  const atPattern = /^(.*?)\s+(?:at|en|@)\s+(.*)$/i.exec(title);
  if (atPattern) {
    return {
      role: atPattern[1]?.trim() || undefined,
      company: atPattern[2]?.trim() || undefined,
    };
  }

  const hiringPattern =
    /^(.*?)\s+(?:is hiring|is looking for|est[aá] buscando|busca)\s+(?:a|an|un|una)?\s*(.*)$/i.exec(
      title,
    );
  if (hiringPattern) {
    return {
      company: hiringPattern[1]?.trim() || undefined,
      role: hiringPattern[2]?.trim() || undefined,
    };
  }

  const parts = title.split(/\s+[|·–—]\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return {
      role: parts[0]?.trim() || undefined,
      company: parts[1]?.trim() || undefined,
    };
  }

  return { role: title };
}

function cleanCompanyName(value: string): string {
  return value
    .replace(/\s+(careers|jobs|hiring|talent|empleos|trabajos)\s*$/i, '')
    .trim();
}

function isJobBoardName(value: string): boolean {
  const normalized = value.toLowerCase().replace(/\s+/g, '');
  return JOB_BOARD_NAME_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
}

function getOrganizationName(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return cleanCompanyName(stripHtml(value)) || undefined;
  }

  const record = asRecord(value);
  const name = asString(record?.name);
  return name ? cleanCompanyName(stripHtml(name)) || undefined : undefined;
}

function extractSalary(value: unknown): ImportedJob['salary'] {
  const salaryRecord = asRecord(Array.isArray(value) ? value[0] : value);
  if (!salaryRecord) return undefined;

  const rawCurrency = asString(salaryRecord.currency)?.toUpperCase();
  if (
    !rawCurrency ||
    !SUPPORTED_SALARY_CURRENCIES.has(rawCurrency as ApplicationCurrency)
  ) {
    return undefined;
  }

  const valueRecord = asRecord(
    Array.isArray(salaryRecord.value)
      ? salaryRecord.value[0]
      : salaryRecord.value,
  );
  if (!valueRecord) return undefined;

  const min = asNumber(valueRecord.minValue) ?? asNumber(valueRecord.value);
  const max =
    asNumber(valueRecord.maxValue) ??
    (valueRecord.minValue === undefined
      ? undefined
      : asNumber(valueRecord.value));

  if (min === undefined && max === undefined) {
    return undefined;
  }

  const unit = asString(valueRecord.unitText)?.toUpperCase() ?? '';
  const frequency: ApplicationSalaryFrequency | undefined = unit.includes(
    'HOUR',
  )
    ? 'hour'
    : unit.includes('MONTH')
      ? 'month'
      : unit.includes('YEAR')
        ? 'year'
        : undefined;

  return {
    desired: min,
    desiredMax: max,
    currency: rawCurrency as ApplicationCurrency,
    frequency,
  };
}

export function inferPlatform(sourceUrl: string): Application['platform'] {
  let hostname: string;

  try {
    hostname = new URL(sourceUrl).hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return 'Otro';
  }

  if (hostname === 'linkedin.com' || hostname.endsWith('.linkedin.com')) {
    return 'LinkedIn';
  }

  if (hostname === 'indeed.com' || hostname.endsWith('.indeed.com')) {
    return 'Indeed';
  }

  if (
    JOB_BOARD_HOSTS.some(
      (board) => hostname === board || hostname.endsWith(`.${board}`),
    )
  ) {
    return 'Portal de empleo';
  }

  return 'Web de la Empresa';
}

export function parseJobImport(html: string, sourceUrl: string): ImportedJob {
  const meta = extractMetaTags(html);
  const posting = findJobPosting(extractJsonLd(html));
  const rawTitle =
    meta['og:title'] ??
    meta['twitter:title'] ??
    extractTitle(html) ??
    '';

  const titleGuess = splitTitle(rawTitle);
  const jsonLdTitle = asString(posting?.title);
  const role =
    (jsonLdTitle ? cleanTitle(jsonLdTitle) : undefined) || titleGuess.role;

  const jsonLdCompany = getOrganizationName(posting?.hiringOrganization);
  const siteName = meta['og:site_name']
    ? cleanCompanyName(stripHtml(meta['og:site_name']))
    : undefined;
  const company =
    jsonLdCompany ??
    titleGuess.company ??
    (siteName && !isJobBoardName(siteName) ? siteName : undefined);

  const rawDescription =
    asString(posting?.description) ??
    meta['og:description'] ??
    meta['twitter:description'] ??
    meta['description'];
  const description = rawDescription
    ? stripHtml(rawDescription).slice(0, 10000) || undefined
    : undefined;

  return {
    company: company?.slice(0, 200),
    role: role?.slice(0, 200),
    platform: inferPlatform(sourceUrl),
    link: sourceUrl,
    description,
    salary: extractSalary(posting?.baseSalary),
  };
}

export function isPrivateAddress(address: string): boolean {
  const family = isIP(address);

  if (family === 4) {
    const octets = address.split('.').map(Number);
    const [first, second, third] = octets;

    if (first === 0 || first === 10 || first === 127) return true;
    if (first === 100 && second >= 64 && second <= 127) return true;
    if (first === 169 && second === 254) return true;
    if (first === 172 && second >= 16 && second <= 31) return true;
    if (first === 192 && second === 168) return true;
    if (first === 192 && second === 0 && third === 0) return true;
    if (first === 198 && (second === 18 || second === 19)) return true;
    if (first === 198 && second === 51 && third === 100) return true;
    if (first === 203 && second === 0 && third === 113) return true;
    if (first >= 224) return true;

    return false;
  }

  if (family === 6) {
    const normalized = address.toLowerCase();

    if (normalized === '::' || normalized === '::1') return true;
    if (/^fe[89ab]/.test(normalized)) return true;
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true;
    if (normalized.startsWith('::ffff:')) {
      const mapped = normalized.slice('::ffff:'.length);
      return isIP(mapped) === 4 ? isPrivateAddress(mapped) : true;
    }

    return false;
  }

  return true;
}

export function validateUrlShape(input: string): URL {
  if (input.length > JOB_IMPORT_LIMITS.maxUrlLength) {
    throw new Error('La URL es demasiado larga.');
  }

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new Error('La URL no es válida.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Solo se permiten URLs http o https.');
  }

  if (url.username || url.password) {
    throw new Error('La URL no puede incluir credenciales.');
  }

  if (url.port && url.port !== '80' && url.port !== '443') {
    throw new Error('La URL usa un puerto no permitido.');
  }

  const hostname = url.hostname
    .toLowerCase()
    .replace(/^\[/, '')
    .replace(/\]$/, '');

  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    throw new Error('Solo se permiten URLs públicas.');
  }

  if (isIP(hostname) && isPrivateAddress(hostname)) {
    throw new Error('Solo se permiten URLs públicas.');
  }

  return url;
}
