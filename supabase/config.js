// Supabase client — preencha as variáveis antes do deploy
const SUPABASE_URL = window.__ENV__?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.__ENV__?.SUPABASE_ANON_KEY || '';

// Quando pronto para conectar:
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const supabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
export { SUPABASE_URL, SUPABASE_ANON_KEY };
