import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StratusButton } from '../StratusButton';
import { StratusCard } from '../StratusCard';
import { ProfileForm } from '../ProfileForm';
import { ThemeToggle } from '../ThemeToggle';
import { isDemoMode } from '../../lib/mode';
export function SettingsPage() {
  const { signOut } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function exit() {
    setLoading(true); setError('');
    try { const result = await signOut(); if (result.error) throw result.error; }
    catch { setError('Sign out failed. Please retry.'); }
    finally { setLoading(false); }
  }
  return <div className="flex flex-col gap-6 max-w-4xl"><div><h1>Settings</h1><p className="mt-2">Manage display details and appearance.</p></div>
    {isDemoMode() && <p>Demo profile edits stay in this tab. Theme preference is saved on this browser across modes.</p>}
    <ProfileForm />
    <StratusCard><div className="flex items-center justify-between gap-4"><div><h2>Appearance</h2><p>Choose light or dark mode.</p></div><ThemeToggle /></div></StratusCard>
    <StratusCard><h2>Future capabilities</h2><p className="mt-3">Email delivery, notifications, daily planning, account deletion, password management and data export are not implemented. No messages or reminders are sent.</p></StratusCard>
    {!isDemoMode() && <StratusCard><h2>Session</h2><StratusButton disabled={loading} onClick={() => void exit()}>{loading ? 'Signing out…' : 'Sign Out'}</StratusButton>{error && <p role="alert">{error}</p>}</StratusCard>}
  </div>;
}
