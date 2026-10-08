export interface QuoteLineItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  opportunityId: string;
  userId: string;
  quoteNumber: string;
  title: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  lineItems: QuoteLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteCreateInput {
  opportunityId: string;
  title: string;
  lineItems: Omit<QuoteLineItem, 'id'>[];
  taxRate?: number;
  notes?: string;
  validUntil?: string;
}

export interface QuoteUpdateInput extends Partial<QuoteCreateInput> {
  status?: Quote['status'];
}
