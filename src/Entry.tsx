import { lazy, Suspense } from 'react';
import { validatePublicConfig } from './lib/config';

const Showcase = lazy(() => import('./App'));
const Application = lazy(() => import('./AppRouter'));

export default function Entry() {
  const isApp = new URLSearchParams(window.location.search).get('mode') === 'app';
  const configurationError = validatePublicConfig(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
  if (isApp && configurationError) return <main className="p-8"><h1>Connect Supabase</h1><p>{configurationError} See the README for backend prerequisites.</p><a href="?mode=showcase">Explore the design showcase</a></main>;
  return <Suspense fallback={<p role="status">Loading Stratus One…</p>}>{isApp ? <Application /> : <Showcase />}</Suspense>;
}
