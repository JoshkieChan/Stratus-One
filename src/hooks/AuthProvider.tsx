import { createContext, useContext, type ReactNode } from 'react';
import { useAuthSession } from './useAuthSession';

const AuthContext = createContext<ReturnType<typeof useAuthSession> | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useAuthSession();
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}
export function useAuthContext() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
