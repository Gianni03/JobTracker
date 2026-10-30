import { headers } from 'next/headers';

export async function getRequestOrigin(): Promise<string> {
  const headerStore = await headers();
  const forwardedHost = headerStore.get('x-forwarded-host');
  const host =
    forwardedHost?.split(',')[0]?.trim() || headerStore.get('host') || '';
  const forwardedProto = headerStore.get('x-forwarded-proto');
  const proto = forwardedProto?.split(',')[0]?.trim() || 'http';

  if (host) {
    return `${proto}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
