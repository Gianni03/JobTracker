import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:dns/promises', () => ({
  lookup: vi.fn(async () => [{ address: '93.184.216.34', family: 4 }]),
}));

import { fetchJobPage, validatePublicUrl } from '@/lib/job-import/network';
import { JOB_IMPORT_LIMITS } from '@/lib/job-import/types';

const originalFetch = global.fetch;

function htmlResponse(body = '<title>Engineer</title>') {
  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

describe('validatePublicUrl', () => {
  it('rejects private literals and localhost without fetching', async () => {
    await expect(validatePublicUrl('http://127.0.0.1:3000')).rejects.toThrow();
    await expect(validatePublicUrl('http://localhost/job')).rejects.toThrow();
  });

  it('accepts a public hostname after DNS validation', async () => {
    await expect(validatePublicUrl('https://example.com/job')).resolves.toBeInstanceOf(
      URL,
    );
  });
});

describe('fetchJobPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('follows a public redirect and returns the final URL', async () => {
    vi.mocked(global.fetch)
      .mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: { location: '/final-job' },
        }),
      )
      .mockResolvedValueOnce(htmlResponse());

    const page = await fetchJobPage('https://example.com/job');

    expect(page.finalUrl).toBe('https://example.com/final-job');
    expect(page.html).toContain('Engineer');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('refuses a redirect to a private address', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: { location: 'http://127.0.0.1/secret' },
      }),
    );

    await expect(fetchJobPage('https://example.com/job')).rejects.toThrow(
      'Solo se permiten URLs públicas.',
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('rejects error responses and non-HTML content', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('not found', { status: 404 }),
    );
    await expect(fetchJobPage('https://example.com/job')).rejects.toThrow(
      'error 404',
    );

    vi.mocked(global.fetch).mockResolvedValueOnce(
      new Response('%PDF', {
        status: 200,
        headers: { 'content-type': 'application/pdf' },
      }),
    );
    await expect(fetchJobPage('https://example.com/job')).rejects.toThrow(
      'no parece ser una página de empleo',
    );
  });

  it('rejects responses larger than the cap', async () => {
    const bigBody = 'x'.repeat(JOB_IMPORT_LIMITS.maxResponseBytes + 1);
    vi.mocked(global.fetch).mockResolvedValueOnce(htmlResponse(bigBody));

    await expect(fetchJobPage('https://example.com/job')).rejects.toThrow(
      'demasiado grande',
    );
  });

  it('stops after the redirect limit', async () => {
    for (let index = 0; index <= JOB_IMPORT_LIMITS.maxRedirects; index += 1) {
      vi.mocked(global.fetch).mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: { location: `/redirect-${index + 1}` },
        }),
      );
    }

    await expect(fetchJobPage('https://example.com/job')).rejects.toThrow(
      'redirige demasiadas veces',
    );
  });
});
