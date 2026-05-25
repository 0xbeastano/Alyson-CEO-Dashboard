import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

const safeUrl = supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder-project.supabase.co';

export const supabase = createClient(safeUrl, supabaseAnonKey);
