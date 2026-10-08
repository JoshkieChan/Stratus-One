import { collectPages } from './pagination';
import { toRow, fromRow } from './mapping';
import { requireTitle, validateOpportunity } from '../domain/validation';
import { supabase } from '../lib/supabaseClient';
import type { Opportunity, OpportunityCreateInput, OpportunityUpdateInput } from '../types/opportunity';

export class OpportunityService {
  static async getPage(userId: string, page = 0, search = '', status = 'all') {
    if (!Number.isSafeInteger(page) || page < 0) throw new Error('Invalid page');
    const pageSize = 24;
    let query = supabase.from('opportunities').select('*', { count: 'exact' }).eq('user_id', userId);
    if (status !== 'all') query = query.eq('status', status);
    if (search.trim()) {
      // Quote PostgREST filter values and escape SQL wildcard characters.
      const literal = search.trim().replace(/[\\%_]/g, '\\$&').replace(/"/g, '\\"');
      query = query.or(`title.ilike."%${literal}%",agency.ilike."%${literal}%"`);
    }
    const { data, error, count } = await query.order('created_at', { ascending: false }).order('id').range(page * pageSize, (page + 1) * pageSize - 1);
    if (error) throw error;
    return { items: (data || []).map(row => fromRow<Opportunity>(row)), total: count ?? 0, pageSize };
  }
  static async getAll(userId: string): Promise<Opportunity[]> {
    const data = await collectPages((from, to) => supabase.from('opportunities').select('*').eq('user_id', userId).order('created_at', { ascending: false }).order('id').range(from, to));
    return data.map(row => fromRow<Opportunity>(row));
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
