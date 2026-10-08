import { toRow, fromRow } from './mapping';
import { requireTitle, validateOpportunity } from '../domain/validation';
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
    return (data || []).map(row => fromRow<Opportunity>(row));
  }

  static async getById(id: string): Promise<Opportunity | null> {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? fromRow<Opportunity>(data) : null;
  }

  static async create(userId: string, input: OpportunityCreateInput): Promise<Opportunity> {
    requireTitle(input.title);
    validateOpportunity(input);
    const { data, error } = await supabase
      .from('opportunities')
      .insert([{ ...toRow(input), user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return fromRow<Opportunity>(data);
  }

  static async update(id: string, input: OpportunityUpdateInput): Promise<Opportunity> {
    validateOpportunity(input);
    const { data, error } = await supabase
      .from('opportunities')
      .update(toRow(input))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return fromRow<Opportunity>(data);
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async calculateWinnability(id: string): Promise<number> {
    // Requires a deployed function with this name and ownership policies.
    const { data, error } = await supabase.functions.invoke('calculate-winnability', {
      body: { opportunityId: id },
    });

    if (error) throw error;
    if (!data || typeof data.score !== 'number' || !Number.isFinite(data.score) || data.score < 0 || data.score > 100) throw new Error('Invalid scoring response');
    return data.score;
  }
}
