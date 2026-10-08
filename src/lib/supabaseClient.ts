import { createClient } from '@supabase/supabase-js';
import { validatePublicConfig } from './config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const configurationError = validatePublicConfig(supabaseUrl, supabaseAnonKey);
if (configurationError) throw new Error(configurationError);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
