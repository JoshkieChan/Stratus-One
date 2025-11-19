import { supabase } from '../lib/supabaseClient';
import type { Opportunity, OpportunityCreateInput, OpportunityUpdateInput } from '../types/opportunity';

export class OpportunityService {
  static async getAll(userId: string): Promise<Opportunity[]> {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getById(id: string): Promise<Opportunity | null> {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(userId: string, input: OpportunityCreateInput): Promise<Opportunity> {
    const { data, error } = await supabase
      .from('opportunities')
      .insert([{ ...input, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(id: string, input: OpportunityUpdateInput): Promise<Opportunity> {
    const { data, error } = await supabase
      .from('opportunities')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async calculateWinnability(id: string): Promise<number> {
    // This would call a Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('calculate-winnability', {
      body: { opportunityId: id },
    });

    if (error) throw error;
    return data.score;
  }
}
