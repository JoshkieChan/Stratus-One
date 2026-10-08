export interface IdentityScore {
  id: string;
  userId: string;
  category: 'technical' | 'business' | 'compliance' | 'financial';
  score: number;
  maxScore: number;
  lastCalculated: string;
  metadata?: Record<string, unknown>;
}

export interface Skill {
  id: string;
  userId: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience?: number;
  certifications?: string[];
  createdAt: string;
}

export interface Tool {
  id: string;
  userId: string;
  name: string;
  category: string;
  version?: string;
  licenseType?: string;
  expiryDate?: string;
  createdAt: string;
}
