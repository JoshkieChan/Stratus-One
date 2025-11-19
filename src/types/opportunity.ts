export interface Opportunity {
  id: string;
  userId: string;
  title: string;
  description: string;
  agency: string;
  solicitationNumber: string;
  value: number;
  deadline: string;
  status: 'open' | 'in_progress' | 'submitted' | 'won' | 'lost' | 'closed';
  winnabilityScore: number;
  category: string;
  setAside?: string;
  naicsCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityCreateInput {
  title: string;
  description: string;
  agency: string;
  solicitationNumber: string;
  value: number;
  deadline: string;
  category: string;
  setAside?: string;
  naicsCode?: string;
}

export interface OpportunityUpdateInput extends Partial<OpportunityCreateInput> {
  status?: Opportunity['status'];
  winnabilityScore?: number;
}
