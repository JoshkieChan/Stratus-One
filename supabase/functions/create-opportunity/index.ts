import { createClient } from 'npm:@supabase/supabase-js@2.117.2';
import { createHandler } from '../_shared/handlers.ts';

Deno.serve(createHandler('create', authorization => createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  { global: { headers: { Authorization: authorization } }, auth: { persistSession: false } },
)));
