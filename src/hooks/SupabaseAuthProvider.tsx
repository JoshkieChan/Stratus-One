import type { ReactNode } from 'react';
import { AuthContext } from './AuthProvider';
import { useAuthSession } from './useAuthSession';
export default function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={useAuthSession()}>{children}</AuthContext.Provider>;
}
