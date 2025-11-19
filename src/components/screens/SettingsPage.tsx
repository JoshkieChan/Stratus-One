import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { StratusButton } from '../StratusButton';
import { StratusCard } from '../StratusCard';
import { StratusInput } from '../StratusInput';
import { ThemeToggle } from '../ThemeToggle';
import { User, Bell, Shield, Database, LogOut } from 'lucide-react';

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-[var(--color-fg-secondary)]">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <StratusCard>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3>Profile Settings</h3>
        </div>

        <div className="flex flex-col gap-4">
          <StratusInput
            label="Email"
            type="email"
            value={user?.email || ''}
            disabled
          />

          <StratusInput
            label="Full Name"
            placeholder="John Doe"
          />

          <StratusInput
            label="Organization"
            placeholder="Your Company Name"
          />

          <div className="flex gap-3 mt-2">
            <StratusButton variant="primary">Save Changes</StratusButton>
            <StratusButton variant="ghost">Cancel</StratusButton>
          </div>
        </div>
      </StratusCard>

      {/* Appearance */}
      <StratusCard>
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3>Appearance</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--color-fg-primary)]">Theme</p>
            <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
              Toggle between light and dark mode
            </p>
          </div>
          <ThemeToggle />
        </div>
      </StratusCard>

      {/* Notifications */}
      <StratusCard>
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3>Notifications</h3>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-fg-primary)]">Email Notifications</p>
              <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
                Receive email updates about opportunities
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-fg-primary)]">Deadline Reminders</p>
              <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
                Get notified before opportunity deadlines
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-fg-primary)]">Task Updates</p>
              <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
                Notifications for task completions and changes
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </StratusCard>

      {/* Security */}
      <StratusCard>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3>Security</h3>
        </div>

        <div className="flex flex-col gap-4">
          <StratusButton variant="secondary" fullWidth>
            Change Password
          </StratusButton>
          <StratusButton variant="secondary" fullWidth>
            Enable Two-Factor Authentication
          </StratusButton>
        </div>
      </StratusCard>

      {/* Data & Privacy */}
      <StratusCard>
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <h3>Data & Privacy</h3>
        </div>

        <div className="flex flex-col gap-3">
          <StratusButton variant="secondary" fullWidth>
            Export My Data
          </StratusButton>
          <StratusButton variant="secondary" fullWidth>
            Delete Account
          </StratusButton>
        </div>
      </StratusCard>

      {/* Sign Out */}
      <StratusCard className="border-[var(--color-danger)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-[var(--color-fg-primary)]">Sign Out</p>
            <p className="text-sm text-[var(--color-fg-secondary)] mt-1">
              Sign out of your account on this device
            </p>
          </div>
          <StratusButton
            variant="secondary"
            onClick={handleSignOut}
            disabled={loading}
            className="border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Signing Out...' : 'Sign Out'}
          </StratusButton>
        </div>
      </StratusCard>
    </div>
  );
}
