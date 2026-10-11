import { lazy, Suspense } from 'react';
import { validatePublicConfig } from './lib/config';
import { getAppMode } from './lib/mode';
const Showcase = lazy(() => import('./App'));
const Application = lazy(() => import('./AppRouter'));
export default function Entry() {
  const mode = getAppMode();
  const error = mode === 'app' ? validatePublicConfig(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY) : null;
  if (error) return <main className="p-8 max-w-2xl"><h1>Connect Supabase</h1><p className="my-4">{error} See the README for backend setup. Hosted verification is pending.</p><a className="underline" href="?mode=demo">Explore the main application in local demo mode</a><p className="mt-4"><a href="?mode=showcase">Design-system showcase</a></p></main>;
  return <Suspense fallback={<p role="status">Loading Stratus One…</p>}>{mode === 'showcase' ? <Showcase /> : <Application />}</Suspense>;
}
