import { calculateQuote } from '../domain/quotes';
import { requireTitle, requireId } from '../domain/validation';
import { toRow, fromRow } from './mapping';
import { supabase } from '../lib/supabaseClient';
import type { Quote, QuoteCreateInput, QuoteUpdateInput } from '../types/quote';

export class QuoteService {
  static async getByOpportunity(opportunityId: string): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('opportunity_id', opportunityId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(row => fromRow<Quote>(row));
  }

  static async getById(id: string): Promise<Quote | null> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? fromRow<Quote>(data) : null;
  }

  static async create(userId: string, input: QuoteCreateInput): Promise<Quote> {
    requireTitle(input.title);
    requireId(input.opportunityId);
    if (!input.lineItems.length) throw new Error('A saved quote requires at least one line item');
    const taxRate = input.taxRate ?? 0;
    const { subtotal, taxAmount, total, lineTotals } = calculateQuote(input.lineItems, taxRate);
    const lineItems = input.lineItems.map((item, i) => ({ ...item, total: lineTotals[i] }));
    const quoteNumber = 'Q-' + crypto.randomUUID();

    const { data, error } = await supabase
      .from('quotes')
      .insert([{
        ...toRow({ ...input, lineItems }),
        user_id: userId,
        quote_number: quoteNumber,
        subtotal,
        tax_rate: taxRate,
        tax_amount: taxAmount,
        total,
        status: 'draft',
      }])
      .select()
      .single();

    if (error) throw error;
    return fromRow<Quote>(data);
  }

  static async update(id: string, input: QuoteUpdateInput): Promise<Quote> {
    if (input.title !== undefined) requireTitle(input.title);
    if (input.opportunityId !== undefined) requireId(input.opportunityId);
    const updateData: Record<string, unknown> = toRow(input);
    if (input.lineItems !== undefined || input.taxRate !== undefined) {
      const existing = await this.getById(id);
      if (!existing) throw new Error('Quote not found');
      const items = input.lineItems ?? existing.lineItems;
      if (!items.length) throw new Error('A saved quote requires at least one line item');
      const taxRate = input.taxRate ?? existing.taxRate;
      const { subtotal, taxAmount, total, lineTotals } = calculateQuote(items, taxRate);
      Object.assign(updateData, { subtotal, tax_rate: taxRate, tax_amount: taxAmount, total, line_items: items.map((item, i) => ({ ...item, total: lineTotals[i] })) });
    }

    const { data, error } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return fromRow<Quote>(data);
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async generatePDF(_id: string): Promise<string> {
    throw new Error('PDF generation is not implemented. No PDF service is deployed by this repository.');
  }
}
