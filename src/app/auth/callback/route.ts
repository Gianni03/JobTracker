import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      let redirectPath = next;

      try {
        const user = data.user;
        const currentCount = Number(user?.user_metadata?.login_count ?? 0);
        const nextCount = currentCount + 1;

        const { error: countError } = await supabase.auth.updateUser({
          data: { ...(user?.user_metadata ?? {}), login_count: nextCount },
        });

        if (
          !countError &&
          nextCount % 10 === 0 &&
          next === '/dashboard'
        ) {
          redirectPath = '/dashboard/donar';
        }
      } catch (countError) {
        console.error('Error updating login count:', countError);
      }

      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}
