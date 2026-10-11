import { createContext, useContext, lazy, Suspense, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { isDemoMode } from '../lib/mode';
export interface AuthSession {
  user: User | null; loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  updateProfile: (profile: { full_name: string; organization: string }) => Promise<{ error: Error | null }>;
}
export const AuthContext = createContext<AuthSession | null>(null);
const HostedProvider = lazy(() => import('./SupabaseAuthProvider'));
const DemoProvider = lazy(() => import('../demo/DemoAuthProvider'));
export function AuthProvider({ children }: { children: ReactNode }) {
  const Provider = isDemoMode() ? DemoProvider : HostedProvider;
  return <Suspense fallback={<p role="status">Loading workspace…</p>}><Provider>{children}</Provider></Suspense>;
}
export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
