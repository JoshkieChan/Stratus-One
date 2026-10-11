import type { Opportunity } from '../types/opportunity';
import type { Task, TaskPack } from '../types/task';
import type { Quote } from '../types/quote';
import { calculateWinnability } from '../domain/winnability';
export const DEMO_USER_ID = '11111111-1111-4111-8111-111111111111';
export const DEMO_OPPORTUNITY_ID = '22222222-2222-4222-8222-222222222221';
export interface DemoState {
  version: 1; opportunities: Opportunity[]; tasks: Task[]; packs: TaskPack[]; quotes: Quote[];
  profile: { full_name: string; organization: string };
}
export function createFixtures(): DemoState {
  const now = new Date().toISOString();
  const future = (days: number) => new Date(Date.now() + days * 86400000).toISOString();
  const opportunities: Opportunity[] = [
    ['Community website accessibility audit','Example City Digital Services',48000,35,'in_progress','Audit a public-service website, document accessibility issues, and deliver a prioritized remediation plan.'],
    ['Library network equipment refresh','Example Regional Library',125000,22,'open','Prepare a phased network refresh and staff handover plan for six library branches.'],
    ['Public records digitization','Example County Records',76000,14,'submitted','Scope document scanning, quality assurance and searchable record delivery.'],
    ['Parks scheduling portal','Example Parks Department',92000,45,'won','Deliver a scheduling portal and training for the parks operations team.'],
    ['Facilities reporting dashboard','Example Facilities Office',35000,8,'lost','Consolidate maintenance reports into an operational dashboard.'],
    ['Visitor information kiosk','Example Visitor Center',24000,5,'closed','Pilot an accessible visitor information kiosk.'],
  ].map(([title,agency,value,days,status,description], index) => {
    const opportunity: Opportunity = { id: `22222222-2222-4222-8222-22222222222${index + 1}`, userId: DEMO_USER_ID,
      title: String(title), agency: String(agency), value: Number(value), deadline: future(Number(days)), status: status as Opportunity['status'], description: String(description), category: 'Professional services', solicitationNumber: `DEMO-${101 + index}`, winnabilityScore: 0, createdAt: now, updatedAt: now };
    opportunity.winnabilityScore = calculateWinnability(opportunity);
    return opportunity;
  });
  const packId = '33333333-3333-4333-8333-333333333333';
  const tasks: Task[] = ['Review statement of work','Confirm delivery milestones','Prepare cost estimate'].map((title,index) => ({
    id: `44444444-4444-4444-8444-44444444444${index + 1}`, opportunityId: DEMO_OPPORTUNITY_ID, taskPackId: packId, title,
    status: index === 0 ? 'completed' : 'pending', priority: 'medium', dueDate: future(index + 2).slice(0,10), completedAt: index === 0 ? now : null, createdAt: now, updatedAt: now,
  }));
  return { version: 1, opportunities, tasks, packs: [{ id: packId, opportunityId: DEMO_OPPORTUNITY_ID, name: 'Proposal preparation', description: 'A small checklist for a first response.', status: 'active', tasks: [], createdAt: now, updatedAt: now }],
    quotes: [{ id: '55555555-5555-4555-8555-555555555555', opportunityId: DEMO_OPPORTUNITY_ID, userId: DEMO_USER_ID, quoteNumber: 'DEMO-Q-001', title: 'Accessibility audit estimate', status: 'draft', version: 1,
      lineItems: [{ description: 'Audit and reporting', quantity: 40, unitPrice: 125, total: 5000 }, { description: 'Review workshop', quantity: 4, unitPrice: 150, total: 600 }], subtotal: 5600, taxRate: 0.05, taxAmount: 280, total: 5880, notes: 'Fictional estimate for local demonstration.', createdAt: now, updatedAt: now }],
    profile: { full_name: 'Demo Reviewer', organization: 'Example Studio' } };
}
