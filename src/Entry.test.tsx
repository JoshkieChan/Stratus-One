// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
vi.mock('./App', () => ({ default: () => <p>Showcase loaded</p> }));
vi.mock('./AppRouter', () => ({ default: () => <p>Application loaded</p> }));
import Entry from './Entry';
afterEach(() => { cleanup(); vi.unstubAllEnvs(); window.history.replaceState(null, '', '/'); });
it('opens the showcase without backend configuration', async () => {
  render(<Entry />);
  expect(await screen.findByText('Showcase loaded')).toBeInTheDocument();
});
it('gives setup instructions instead of crashing with missing environment variables', () => {
  vi.stubEnv('VITE_SUPABASE_URL', '');
  window.history.replaceState(null, '', '/?mode=app');
  render(<Entry />);
  expect(screen.getByRole('heading', { name: 'Connect Supabase' })).toBeInTheDocument();
});
it('opens the application when configured and requested', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_example');
  window.history.replaceState(null, '', '/?mode=app');
  render(<Entry />);
  expect(await screen.findByText('Application loaded')).toBeInTheDocument();
});
