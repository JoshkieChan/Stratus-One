// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
const { create, getAll, update } = vi.hoisted(() => ({ create: vi.fn(), getAll: vi.fn(), update: vi.fn() }));
vi.mock('../hooks/useAuth', () => { const user = { id: 'owner' }; return { useAuth: () => ({ user }) }; });
vi.mock('../services/OpportunityService', () => ({ OpportunityService: { create, getAll, update } }));
import { OpportunityForm } from './OpportunityForm';
import { PipelineBoardPage } from './screens/PipelineBoardPage';
afterEach(() => { cleanup(); vi.clearAllMocks(); });
const opportunity = { id: 'record', title: 'Website contract', agency: 'Agency', value: 100, status: 'open', winnabilityScore: 50 };
function fillForm() {
  for (const [label, value] of [['Opportunity title','Website contract'], ['Agency or client','Agency'], ['Solicitation number','ABC'], ['Category','IT'], ['Description','Build a website'], ['Estimated value (USD)','100'], ['Deadline (end of day UTC)','2027-01-01']]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
}
it('creates an opportunity with typed values and reports the persisted record', async () => {
  create.mockResolvedValue(opportunity);
  const onCreated = vi.fn();
  render(<OpportunityForm userId="owner" onCreated={onCreated} onCancel={vi.fn()} />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Create Opportunity' }));
  await vi.waitFor(() => expect(onCreated).toHaveBeenCalledWith(opportunity));
  expect(create).toHaveBeenCalledWith('owner', expect.objectContaining({ value: 100, deadline: '2027-01-01T23:59:59Z' }));
});
it('keeps creation failures visible without reporting success', async () => {
  create.mockRejectedValue(new Error('offline'));
  const onCreated = vi.fn();
  render(<OpportunityForm userId="owner" onCreated={onCreated} onCancel={vi.fn()} />);
  fillForm();
  fireEvent.click(screen.getByRole('button', { name: 'Create Opportunity' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not create');
  expect(onCreated).not.toHaveBeenCalled();
});
it('moves a pipeline card only after persistence succeeds', async () => {
  getAll.mockResolvedValue([opportunity]);
  update.mockResolvedValue({ ...opportunity, status: 'won' });
  render(<PipelineBoardPage />);
  fireEvent.change(await screen.findByLabelText('Stage for Website contract'), { target: { value: 'won' } });
  await vi.waitFor(() => expect(screen.getByLabelText('Stage for Website contract')).toHaveValue('won'));
  expect(update).toHaveBeenCalledWith('record', { status: 'won' });
});
it('retains the pipeline stage when a write fails', async () => {
  getAll.mockResolvedValue([opportunity]);
  update.mockRejectedValue(new Error('offline'));
  render(<PipelineBoardPage />);
  fireEvent.change(await screen.findByLabelText('Stage for Website contract'), { target: { value: 'won' } });
  expect(await screen.findByRole('alert')).toHaveTextContent('previous stage');
  expect(screen.getByLabelText('Stage for Website contract')).toHaveValue('open');
});
