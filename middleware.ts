import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const CANONICAL_HOST = 'www.jobtracker.com.ar';
const LEGACY_VERCEL_HOSTS = new Set(['job-tracker-one-eta.vercel.app']);

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? '';
  const isLegacyHost = LEGACY_VERCEL_HOSTS.has(host);
  const isProductionVercelAlias =
    isLegacyHost ||
    (process.env.VERCEL_ENV === 'production' && host.endsWith('.vercel.app'));

  if (isProductionVercelAlias && host !== CANONICAL_HOST) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas de solicitud excepto las que comienzan con:
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico (archivo favicon)
     * - auth (rutas de autenticación si las tuvieras separadas)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
