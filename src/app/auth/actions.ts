'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getRequestOrigin } from '@/lib/auth-url';
import {
  passwordUpdateSchema,
  profileSchema,
} from '@/lib/validation/profile';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  // rememberMe está disponible en formData pero Supabase ya persiste sesiones por defecto
  // const rememberMe = formData.get('rememberMe') === 'true';

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  let redirectTo = '/dashboard';

  try {
    const user = data.user;
    const currentCount = Number(user?.user_metadata?.login_count ?? 0);
    const nextCount = currentCount + 1;

    const { error: countError } = await supabase.auth.updateUser({
      data: { ...(user?.user_metadata ?? {}), login_count: nextCount },
    });

    if (!countError && nextCount % 10 === 0) {
      redirectTo = '/dashboard/donar';
    }
  } catch (countError) {
    console.error('Error updating login count:', countError);
  }

  // Nota: Supabase por defecto persiste las sesiones mediante cookies HTTP-only
  // que duran 7 días. El checkbox "Recordarme" proporciona claridad al usuario
  // sobre este comportamiento, pero la funcionalidad ya está implementada.

  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('first-name') as string;
  const lastName = formData.get('last-name') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // El signup fue exitoso pero el email requiere confirmación
  // No redirigimos - el usuario debe confirmar su email primero
  // Retornamos un flag para que la UI muestre el mensaje correspondiente
  return { success: true, emailConfirmationRequired: true };
}

export async function updateProfile(input: unknown) {
  const parsed = profileSchema.safeParse(input);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Datos de perfil inválidos.',
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'Tu sesión expiró. Volvé a iniciar sesión.' };
  }

  const { firstName, lastName } = parsed.data;
  const fullName = [firstName, lastName].filter(Boolean).join(' ');

  const { error } = await supabase.auth.updateUser({
    data: {
      ...(user.user_metadata ?? {}),
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/dashboard/settings');

  return { success: true, fullName };
}

export async function updatePassword(input: unknown) {
  const parsed = passwordUpdateSchema.safeParse(input);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? 'Contraseña inválida.',
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: 'Tu sesión expiró. Volvé a iniciar sesión.' };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const origin = await getRequestOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error con Google:', error.message);
    return { error: 'No pudimos iniciar sesión con Google. Intentá de nuevo.' };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { error: 'No pudimos iniciar sesión con Google. Intentá de nuevo.' };
}
