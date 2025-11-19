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
    return data || [];
  }

  static async getById(id: string): Promise<Quote | null> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(userId: string, input: QuoteCreateInput): Promise<Quote> {
    // Calculate totals
    const subtotal = input.lineItems.reduce((sum, item) => sum + item.total, 0);
    const taxRate = input.taxRate || 0;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    const quoteNumber = `Q-${Date.now()}`;

    const { data, error } = await supabase
      .from('quotes')
      .insert([{
        ...input,
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
    return data;
  }

  static async update(id: string, input: QuoteUpdateInput): Promise<Quote> {
    const updateData: any = { ...input };

    // Recalculate totals if line items changed
    if (input.lineItems) {
      const subtotal = input.lineItems.reduce((sum, item) => sum + item.total, 0);
      const taxRate = input.taxRate || 0;
      const taxAmount = subtotal * taxRate;
      const total = subtotal + taxAmount;

      updateData.subtotal = subtotal;
      updateData.tax_amount = taxAmount;
      updateData.total = total;
    }

    const { data, error } = await supabase
      .from('quotes')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async generatePDF(id: string): Promise<string> {
    // This would call a Supabase Edge Function to generate PDF
    const { data, error } = await supabase.functions.invoke('generate-quote-pdf', {
      body: { quoteId: id },
    });

    if (error) throw error;
    return data.pdfUrl;
  }
}
