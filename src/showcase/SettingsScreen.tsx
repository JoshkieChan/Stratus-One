import { useState } from 'react';
import { StratusButton } from '../components/StratusButton';
import { StratusInput } from '../components/StratusInput';
import { StratusCard } from '../components/StratusCard';

import { ToggleRow } from './ToggleRow';
import { IntegrationCard } from './IntegrationCard';
export function SettingsScreen() {
  const [fullName, setFullName] = useState('Joshkie');
  const [email, setEmail] = useState('joshkie@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-8">
          <h2 className="text-[#01204A] mb-1">Settings</h2>
          <p className="text-[#6A6D72]">Manage your STRATUSONE OS preferences</p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-[#1E1F22] mb-4">Profile Settings</h3>
            <div className="flex flex-col gap-4">
              <StratusInput
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <StratusInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <StratusInput
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="h-px bg-[#E8EAED]" />

          <div>
            <h3 className="text-[#1E1F22] mb-4">Notifications</h3>
            <div className="flex flex-col gap-4">
              <ToggleRow label="Email notifications for new opportunities" defaultChecked />
              <ToggleRow label="Daily digest summary" defaultChecked />
              <ToggleRow label="Task reminders" defaultChecked />
              <ToggleRow label="Pipeline updates" />
              <ToggleRow label="Weekly performance report" defaultChecked />
            </div>
          </div>

          <div className="h-px bg-[#E8EAED]" />

          <div>
            <h3 className="text-[#1E1F22] mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <IntegrationCard
                name="Google Calendar"
                status="Connected"
                icon="📅"
              />
              <IntegrationCard
                name="Gmail"
                status="Connected"
                icon="✉️"
              />
              <IntegrationCard
                name="Salesforce"
                status="Not Connected"
                icon="☁️"
              />
              <IntegrationCard
                name="Slack"
                status="Not Connected"
                icon="💬"
              />
            </div>
          </div>

          <div className="h-px bg-[#E8EAED]" />

          <div>
            <h3 className="text-[#1E1F22] mb-4">Appearance</h3>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-white border-2 border-[#0057FF] rounded-lg">
                Light Mode
              </button>
              <button className="px-6 py-3 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">
                Dark Mode
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <StratusButton variant="primary">Save Changes</StratusButton>
            <StratusButton variant="ghost">Cancel</StratusButton>
          </div>
        </div>
      </StratusCard>
    </div>
  );
}
