// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
const { signUp } = vi.hoisted(() => ({ signUp: vi.fn() }));
vi.mock('../hooks/useAuth', () => ({ useAuth: () => ({ user: { id: 'user' }, loading: false, signUp }) }));
vi.mock('../services/OpportunityService', () => ({ OpportunityService: { getById: vi.fn() } }));
vi.mock('../services/TaskService', () => ({ TaskService: { getTaskPacks: vi.fn().mockResolvedValue([]) } }));
vi.mock('../services/QuoteService', () => ({ QuoteService: { create: vi.fn() } }));
import { TaskPackPage } from './screens/TaskPackPage';
import { QuoteGeneratorPage } from './screens/QuoteGeneratorPage';
import { QuoteGenerator } from './QuoteGenerator';
import { StratusInput } from './StratusInput';
import { LoginPage } from './screens/LoginPage';
afterEach(cleanup);
it('shows a selection prompt instead of loading forever without an opportunity', () => {
  render(<TaskPackPage />);
  expect(screen.getByText(/Select an opportunity/)).toBeInTheDocument();
  expect(screen.queryByText(/Loading task packs/)).not.toBeInTheDocument();
});
it('disables saving without opportunity context and disables printing an empty quote', () => {
  render(<QuoteGeneratorPage />);
  expect(screen.getByRole('button', { name: /Save Quote/ })).toBeDisabled();
  expect(screen.getByRole('button', { name: /Print \/ Save PDF/ })).toBeDisabled();
});
it('updates the markup calculator and rejects negative costs', () => {
  render(<QuoteGenerator />);
  fireEvent.change(screen.getByLabelText('Base Cost'), { target: { value: '100' } });
  expect(screen.getByText('$130.00')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Base Cost'), { target: { value: '-1' } });
  expect(screen.getByRole('alert')).toHaveTextContent('non-negative');
});
it('associates a label and forwards native disabled/required attributes', () => {
  render(<StratusInput label="Email address" disabled required />);
  expect(screen.getByLabelText('Email address')).toBeDisabled();
  expect(screen.getByLabelText('Email address')).toBeRequired();
});
it('shows email confirmation guidance after successful sign-up', async () => {
  signUp.mockResolvedValue({ error: null });
  render(<LoginPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Need an account? Create one' }));
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'example-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Check your email');
});
it('does not report successful sign-up when authentication rejects', async () => {
  signUp.mockResolvedValue({ error: new Error('Sign-up unavailable') });
  render(<LoginPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Need an account? Create one' }));
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'example-password' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  expect(await screen.findByText('Sign-up unavailable')).toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
