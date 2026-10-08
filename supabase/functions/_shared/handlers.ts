import type { SupabaseClient } from '@supabase/supabase-js';
import { calculateWinnability } from '../../../src/domain/winnability.ts';
import { requireId, requireTitle } from '../../../src/domain/validation.ts';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, 'Content-Type': 'application/json' },
});

/** Client must carry the request's verified user token, never a service-role key. */
export function createHandler(kind: 'score' | 'create', clientFor: (authorization: string) => SupabaseClient) {
  return async (request: Request): Promise<Response> => {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { error: 'Method not allowed' });
    const authorization = request.headers.get('Authorization');
    if (!authorization?.startsWith('Bearer ')) return reply(401, { error: 'Authentication required' });
    try {
      const client = clientFor(authorization);
      const { data: { user }, error: authError } = await client.auth.getUser();
      if (authError || !user) return reply(401, { error: 'Authentication required' });
      let input: Record<string, unknown>;
      try {
        const raw = await request.text();
        if (raw.length > 16_384) return reply(413, { error: 'Request too large' });
        const parsed: unknown = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
        input = parsed as Record<string, unknown>;
      } catch { return reply(400, { error: 'Expected a JSON object' }); }

      if (kind === 'score') {
        try { requireId(input.opportunityId); } catch { return reply(400, { error: 'Invalid opportunity ID' }); }
        const { data, error } = await client.from('opportunities').select('*').eq('id', input.opportunityId).eq('user_id', user.id).maybeSingle();
        if (error) return reply(500, { error: 'Unable to read opportunity' });
        if (!data) return reply(404, { error: 'Opportunity not found' });
        const score = calculateWinnability({ deadline: data.deadline, value: data.value });
        const result = await client.from('opportunities').update({ winnability_score: score }).eq('id', input.opportunityId).eq('user_id', user.id).select('id').single();
        if (result.error || !result.data) return reply(500, { error: 'Unable to save score' });
        return reply(200, { score });
      }

      const fields = ['title', 'description', 'agency', 'solicitation_number', 'value', 'deadline', 'category', 'set_aside', 'naics_code'];
      if (Object.keys(input).some(key => !fields.includes(key))) return reply(400, { error: 'Unsupported opportunity field' });
      try {
        requireTitle(input.title);
        for (const key of ['description', 'agency', 'solicitation_number', 'category']) {
          if (typeof input[key] !== 'string' || !(input[key] as string).trim()) throw new Error();
        }
        for (const key of ['set_aside', 'naics_code']) if (input[key] !== undefined && typeof input[key] !== 'string') throw new Error();
        if (typeof input.value !== 'number' || !Number.isFinite(input.value) || input.value < 0 || typeof input.deadline !== 'string' || !Number.isFinite(Date.parse(input.deadline))) throw new Error();
      } catch { return reply(400, { error: 'Invalid opportunity fields' }); }
      const { data, error } = await client.from('opportunities').insert([{ ...input, user_id: user.id, status: 'open', winnability_score: 0 }]).select().single();
      if (error) return reply(500, { error: 'Unable to create opportunity' });
      return reply(201, data);
    } catch { return reply(500, { error: 'Request failed' }); }
  };
}
