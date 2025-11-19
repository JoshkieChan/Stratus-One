import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { opportunityId } = await req.json();

    // Fetch opportunity details
    const { data: opportunity, error } = await supabaseClient
      .from('opportunities')
      .select('*')
      .eq('id', opportunityId)
      .single();

    if (error) throw error;

    // Calculate winnability score based on various factors
    let score = 50; // Base score

    // Factor 1: Timeline (more time = higher score)
    const daysUntilDeadline = Math.floor(
      (new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilDeadline > 30) score += 15;
    else if (daysUntilDeadline > 14) score += 10;
    else if (daysUntilDeadline > 7) score += 5;

    // Factor 2: Value range (sweet spot scoring)
    if (opportunity.value >= 100000 && opportunity.value <= 1000000) score += 10;
    else if (opportunity.value < 100000) score += 15;

    // Factor 3: Category match (placeholder - would match to user skills)
    score += 10;

    // Factor 4: Set-aside advantages
    if (opportunity.set_aside) score += 10;

    // Ensure score is between 0-100
    score = Math.max(0, Math.min(100, score));

    // Update opportunity with calculated score
    await supabaseClient
      .from('opportunities')
      .update({ winnability_score: score })
      .eq('id', opportunityId);

    return new Response(JSON.stringify({ score }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
