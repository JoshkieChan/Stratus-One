import { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import { StratusCard } from './StratusCard';
import { StratusInput } from './StratusInput';
import { StratusButton } from './StratusButton';
/** Display metadata only: never used for authorization or ownership. */
export function ProfileForm() {
  const { user } = useAuth();
  const [name, setName] = useState<string>(typeof user?.user_metadata.full_name === 'string' ? user.user_metadata.full_name : '');
  const [organization, setOrganization] = useState<string>(typeof user?.user_metadata.organization === 'string' ? user.user_metadata.organization : '');
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setMessage(''); setFailed(false);
    try {
      const { error } = await supabase.auth.updateUser({ data: { full_name: name.trim(), organization: organization.trim() } });
      if (error) throw error;
      setMessage('Profile saved.');
    } catch { setFailed(true); setMessage('Profile could not be saved. Please retry.'); }
    finally { setPending(false); }
  }
  return <StratusCard><h2 className="mb-4">Profile Settings</h2><form onSubmit={save}>
    <fieldset disabled={pending} className="flex flex-col gap-4">
      <StratusInput label="Email" value={user?.email ?? ''} disabled />
      <StratusInput label="Full Name" value={name} onChange={event => setName(event.target.value)} maxLength={200} required />
      <StratusInput label="Organization" value={organization} onChange={event => setOrganization(event.target.value)} maxLength={200} />
      <StratusButton type="submit">{pending ? 'Saving…' : 'Save Profile'}</StratusButton>
      {message && <p role={failed ? 'alert' : 'status'}>{message}</p>}
    </fieldset>
  </form></StratusCard>;
}
