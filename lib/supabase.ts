import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Este es el objeto que usaremos para hacer consultas (select, insert, login, etc.)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);