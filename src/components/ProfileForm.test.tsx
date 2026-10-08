// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
const { updateUser } = vi.hoisted(() => ({ updateUser: vi.fn() }));
vi.mock('../lib/supabaseClient', () => ({ supabase: { auth: { updateUser } } }));
vi.mock('../hooks/useAuth', () => ({ useAuth: () => ({ user: { email: 'owner@example.com', user_metadata: { full_name: 'Owner' } } }) }));
import { ProfileForm } from './ProfileForm';
afterEach(cleanup);
it('persists display metadata without changing authorization metadata', async () => {
  updateUser.mockResolvedValue({ error: null });
  render(<ProfileForm />);
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'New Name' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));
  expect(await screen.findByRole('status')).toHaveTextContent('Profile saved');
  expect(updateUser).toHaveBeenCalledWith({ data: { full_name: 'New Name', organization: '' } });
});
it('reports a rejected profile write', async () => {
  updateUser.mockResolvedValue({ error: new Error('offline') });
  render(<ProfileForm />);
  fireEvent.click(screen.getByRole('button', { name: 'Save Profile' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('could not be saved');
});
