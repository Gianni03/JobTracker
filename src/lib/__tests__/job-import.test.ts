import { describe, expect, it } from 'vitest';
import {
  inferPlatform,
  isPrivateAddress,
  parseJobImport,
  validateUrlShape,
} from '@/lib/job-import/parse';

describe('isPrivateAddress', () => {
  it.each([
    '127.0.0.1',
    '10.0.0.1',
    '172.16.4.2',
    '192.168.1.10',
    '169.254.1.1',
    '100.64.0.1',
    '0.0.0.0',
    '224.0.0.1',
    '::1',
    '::',
    'fe80::1',
    'fd00::1',
    '::ffff:127.0.0.1',
  ])('blocks %s', (address) => {
    expect(isPrivateAddress(address)).toBe(true);
  });

  it.each(['8.8.8.8', '1.1.1.1', '2606:4700:4700::1111'])(
    'allows public %s',
    (address) => {
      expect(isPrivateAddress(address)).toBe(false);
    },
  );
});

describe('validateUrlShape', () => {
  it('accepts a public http(s) URL', () => {
    expect(validateUrlShape('https://example.com/jobs/1').hostname).toBe(
      'example.com',
    );
  });

  it.each([
    'file:///etc/passwd',
    'javascript:alert(1)',
    'ftp://example.com/file',
    'https://user:pass@example.com/job',
    'http://localhost:3000/job',
    'http://127.0.0.1/job',
    'http://10.0.0.5/job',
    'http://example.com:8080/job',
    'http://service.internal/job',
  ])('rejects %s', (url) => {
    expect(() => validateUrlShape(url)).toThrow();
  });
});

describe('inferPlatform', () => {
  it('maps LinkedIn and Indeed', () => {
    expect(inferPlatform('https://www.linkedin.com/jobs/view/1')).toBe(
      'LinkedIn',
    );
    expect(inferPlatform('https://ar.indeed.com/viewjob?jk=1')).toBe('Indeed');
  });

  it('maps known boards to Portal de empleo', () => {
    expect(inferPlatform('https://www.getonboard.com/jobs/1')).toBe(
      'Portal de empleo',
    );
    expect(inferPlatform('https://www.computrabajo.com/job/1')).toBe(
      'Portal de empleo',
    );
  });

  it('falls back to the company website', () => {
    expect(inferPlatform('https://careers.acme.com/jobs/1')).toBe(
      'Web de la Empresa',
    );
  });
});

describe('parseJobImport', () => {
  it('uses JSON-LD JobPosting data when present', () => {
    const html = `
      <html>
        <head>
          <title>Senior Frontend Engineer | Acme</title>
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": "Senior Frontend Engineer",
              "hiringOrganization": { "@type": "Organization", "name": "Acme" },
              "description": "<p>Build <strong>things</strong> with React.</p>",
              "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": {
                  "@type": "QuantitativeValue",
                  "minValue": 80000,
                  "maxValue": 120000,
                  "unitText": "YEAR"
                }
              }
            }
          </script>
        </head>
      </html>
    `;

    const job = parseJobImport(html, 'https://careers.acme.com/jobs/1');

    expect(job.company).toBe('Acme');
    expect(job.role).toBe('Senior Frontend Engineer');
    expect(job.description).toBe('Build things with React.');
    expect(job.salary).toEqual({
      desired: 80000,
      desiredMax: 120000,
      currency: 'USD',
      frequency: 'year',
    });
    expect(job.platform).toBe('Web de la Empresa');
  });

  it('falls back to OpenGraph and title heuristics', () => {
    const html = `
      <html>
        <head>
          <meta property="og:title" content="Frontend Engineer at Beta" />
          <meta property="og:site_name" content="Beta" />
          <meta name="description" content="A great role." />
          <title>Frontend Engineer at Beta</title>
        </head>
      </html>
    `;

    const job = parseJobImport(html, 'https://jobs.beta.com/1');

    expect(job.company).toBe('Beta');
    expect(job.role).toBe('Frontend Engineer');
    expect(job.description).toBe('A great role.');
  });

  it('splits pipe titles and detects LinkedIn', () => {
    const job = parseJobImport(
      '<title>Backend Engineer | Gamma | LinkedIn</title>',
      'https://www.linkedin.com/jobs/view/123',
    );

    expect(job.platform).toBe('LinkedIn');
    expect(job.role).toBe('Backend Engineer');
    expect(job.company).toBe('Gamma');
  });

  it('never uses a job board name as the company', () => {
    const html = `
      <meta property="og:title" content="Platform Engineer" />
      <meta property="og:site_name" content="LinkedIn" />
    `;

    const job = parseJobImport(html, 'https://www.linkedin.com/jobs/view/1');

    expect(job.company).toBeUndefined();
    expect(job.role).toBe('Platform Engineer');
  });

  it('leaves unknown fields empty instead of inventing them', () => {
    const job = parseJobImport('<html></html>', 'https://example.com/job');

    expect(job.company).toBeUndefined();
    expect(job.role).toBeUndefined();
    expect(job.description).toBeUndefined();
    expect(job.salary).toBeUndefined();
    expect(job.link).toBe('https://example.com/job');
  });

  it('ignores unsupported salary currencies instead of converting them', () => {
    const html = `
      <script type="application/ld+json">
        {
          "@type": "JobPosting",
          "title": "Engineer",
          "baseSalary": {
            "currency": "CAD",
            "value": { "value": 100000, "unitText": "YEAR" }
          }
        }
      </script>
    `;

    expect(parseJobImport(html, 'https://example.com/job').salary).toBeUndefined();
  });
});
