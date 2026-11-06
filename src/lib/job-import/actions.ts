'use server';

import { z } from 'zod';
import { createClient } from '@/utils/supabase/server';
import { fetchJobPage } from '@/lib/job-import/network';
import { parseJobImport } from '@/lib/job-import/parse';
import type { JobImportActionResult } from '@/lib/job-import/types';

const importInputSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Ingresá una URL.')
    .max(2048, 'La URL es demasiado larga.'),
});

export async function importJobFromUrl(
  input: unknown,
): Promise<JobImportActionResult> {
  const parsed = importInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'URL inválida.',
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, error: 'No autorizado.' };
  }

  try {
    const page = await fetchJobPage(parsed.data.url);
    const job = parseJobImport(page.html, page.finalUrl);

    return { success: true, job };
  } catch (error) {
    console.error(
      'Job URL import failed:',
      error instanceof Error ? error.message : error,
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'No pudimos importar la oferta.',
    };
  }
}
