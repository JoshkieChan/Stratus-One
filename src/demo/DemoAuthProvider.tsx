import { useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { AuthContext } from '../hooks/AuthProvider';
import { readDemo, writeDemo } from './store';
import { DEMO_USER_ID } from './fixtures';
export default function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => ({ id: DEMO_USER_ID, email: 'reviewer@example.test', aud: 'authenticated', app_metadata: {}, user_metadata: readDemo().profile, created_at: '2026-01-01T00:00:00Z' }));
  const unavailable = async () => ({ error: new Error('Account authentication requires Supabase mode.') });
  const updateProfile = async (profile: { full_name: string; organization: string }) => {
    const state = readDemo(); state.profile = profile; writeDemo(state); setUser(previous => ({ ...previous, user_metadata: profile }));
    return { error: null };
  };
  return <AuthContext.Provider value={{ user, loading: false, signIn: unavailable, signUp: unavailable, signOut: unavailable, updateProfile }}>{children}</AuthContext.Provider>;
}
