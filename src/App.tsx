import { useState } from 'react';
import { StratusButton } from './components/StratusButton';
import { StratusInput } from './components/StratusInput';
import { StratusCard } from './components/StratusCard';
import { StratusBadge } from './components/StratusBadge';
import { OpportunityCard } from './components/OpportunityCard';
import { TaskRow } from './components/TaskRow';
import { PipelineColumn } from './components/PipelineColumn';
import { QuoteGenerator } from './components/QuoteGenerator';
import { StratusLogo } from './components/StratusLogo';
import { ThemeToggle } from './components/ThemeToggle';
import { DesignTokensScreen } from './components/DesignTokensScreen';
import { 
  Menu, X, Palette, Type, Layout, Box, Layers, 
  LayoutDashboard, FileText, ClipboardList, Mail,
  Trello, User, Settings, Calendar
} from 'lucide-react';

type NavItem = 
  | 'atoms' 
  | 'molecules' 
  | 'colors' 
  | 'typography' 
  | 'layout'
  | 'tokens'
  | 'dashboard'
  | 'feed'
  | 'detail'
  | 'taskpack'
  | 'quotegen'
  | 'email'
  | 'pipeline'
  | 'profile'
  | 'settings'
  | 'planner';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('atoms');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-[var(--color-bg-primary)] border-r border-[var(--color-border-default)] transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <div className="p-6 border-b border-[var(--color-border-default)]">
          <div className="flex items-center gap-3 mb-2">
            <StratusLogo variant="loop" size={32} />
            <div>
              <h3 className="text-[var(--color-fg-primary)]">STRATUSONE</h3>
              <p className="text-sm text-[var(--color-fg-secondary)]">Design System</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <p className="text-xs text-[var(--color-fg-secondary)] px-3 mb-2 uppercase tracking-wider">Foundation</p>
            <NavButton 
              icon={<Box className="w-4 h-4" />}
              label="Atoms"
              active={activeNav === 'atoms'}
              onClick={() => setActiveNav('atoms')}
            />
            <NavButton 
              icon={<Layers className="w-4 h-4" />}
              label="Molecules"
              active={activeNav === 'molecules'}
              onClick={() => setActiveNav('molecules')}
            />
            <NavButton 
              icon={<Palette className="w-4 h-4" />}
              label="Colors"
              active={activeNav === 'colors'}
              onClick={() => setActiveNav('colors')}
            />
            <NavButton 
              icon={<Type className="w-4 h-4" />}
              label="Typography"
              active={activeNav === 'typography'}
              onClick={() => setActiveNav('typography')}
            />
            <NavButton 
              icon={<Layout className="w-4 h-4" />}
              label="Layout System"
              active={activeNav === 'layout'}
              onClick={() => setActiveNav('layout')}
            />
            <NavButton 
              icon={<Box className="w-4 h-4" />}
              label="Design Tokens"
              active={activeNav === 'tokens'}
              onClick={() => setActiveNav('tokens')}
            />
          </div>

          <div>
            <p className="text-xs text-[var(--color-fg-secondary)] px-3 mb-2 uppercase tracking-wider">OS Screens</p>
            <NavButton 
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active={activeNav === 'dashboard'}
              onClick={() => setActiveNav('dashboard')}
            />
            <NavButton 
              icon={<FileText className="w-4 h-4" />}
              label="Opportunity Feed"
              active={activeNav === 'feed'}
              onClick={() => setActiveNav('feed')}
            />
            <NavButton 
              icon={<FileText className="w-4 h-4" />}
              label="Opportunity Detail"
              active={activeNav === 'detail'}
              onClick={() => setActiveNav('detail')}
            />
            <NavButton 
              icon={<ClipboardList className="w-4 h-4" />}
              label="Task Pack"
              active={activeNav === 'taskpack'}
              onClick={() => setActiveNav('taskpack')}
            />
            <NavButton 
              icon={<FileText className="w-4 h-4" />}
              label="Quote Generator"
              active={activeNav === 'quotegen'}
              onClick={() => setActiveNav('quotegen')}
            />
            <NavButton 
              icon={<Mail className="w-4 h-4" />}
              label="Email Builder"
              active={activeNav === 'email'}
              onClick={() => setActiveNav('email')}
            />
            <NavButton 
              icon={<Trello className="w-4 h-4" />}
              label="Pipeline Board"
              active={activeNav === 'pipeline'}
              onClick={() => setActiveNav('pipeline')}
            />
            <NavButton 
              icon={<User className="w-4 h-4" />}
              label="Identity Profile"
              active={activeNav === 'profile'}
              onClick={() => setActiveNav('profile')}
            />
            <NavButton 
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              active={activeNav === 'settings'}
              onClick={() => setActiveNav('settings')}
            />
            <NavButton 
              icon={<Calendar className="w-4 h-4" />}
              label="Daily Planner"
              active={activeNav === 'planner'}
              onClick={() => setActiveNav('planner')}
            />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
          <div className="px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors lg:hidden flex-shrink-0"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-[var(--color-fg-primary)] ml-4 lg:ml-0 flex-1 min-w-0 truncate">
              {getNavTitle(activeNav)}
            </h1>
            <div className="flex items-center gap-3 flex-shrink-0">
              <ThemeToggle />
              <StratusButton variant="secondary" className="hidden sm:flex">Documentation</StratusButton>
              <StratusButton variant="primary">Get Started</StratusButton>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {activeNav === 'atoms' && <AtomsTab />}
            {activeNav === 'molecules' && <MoleculesTab />}
            {activeNav === 'colors' && <ColorsTab />}
            {activeNav === 'typography' && <TypographyTab />}
            {activeNav === 'layout' && <LayoutTab />}
            {activeNav === 'tokens' && <DesignTokensScreen />}
            {activeNav === 'dashboard' && <DashboardScreen />}
            {activeNav === 'feed' && <OpportunityFeedScreen />}
            {activeNav === 'detail' && <OpportunityDetailScreen />}
            {activeNav === 'taskpack' && <TaskPackScreen />}
            {activeNav === 'quotegen' && <QuoteGeneratorScreen />}
            {activeNav === 'email' && <EmailBuilderScreen />}
            {activeNav === 'pipeline' && <PipelineBoardScreen />}
            {activeNav === 'profile' && <IdentityProfileScreen />}
            {activeNav === 'settings' && <SettingsScreen />}
            {activeNav === 'planner' && <DailyPlannerScreen />}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1 ${
        active 
          ? 'bg-[var(--color-accent-primary)] text-white shadow-sm' 
          : 'text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)]'
      }`}
    >
      {icon}
      <span className="text-sm whitespace-nowrap">{label}</span>
    </button>
  );
}

function getNavTitle(nav: NavItem): string {
  const titles: Record<NavItem, string> = {
    atoms: 'Atoms',
    molecules: 'Molecules',
    colors: 'Color Palette',
    typography: 'Typography System',
    layout: 'Layout System',
    tokens: 'Design Tokens',
    dashboard: 'Daily Dashboard',
    feed: 'Opportunity Feed',
    detail: 'Opportunity Detail',
    taskpack: 'Task Pack',
    quotegen: 'Quote Generator',
    email: 'Email Builder',
    pipeline: 'Pipeline Board',
    profile: 'Identity Profile',
    settings: 'Settings',
    planner: 'Daily Planner'
  };
  return titles[nav];
}

function AtomsTab() {
  const [filledInputValue, setFilledInputValue] = useState('Filled input');

  return (
    <div className="flex flex-col gap-12">
      {/* Button Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Buttons</h2>
        <p className="text-[#6A6D72] mb-6">All button variants and states</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Button States */}
          <StratusCard>
            <h3 className="mb-4">Primary Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="primary">Primary Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="primary">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg bg-[#E8EAED] text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg bg-[#0057FF] text-white flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>

          {/* Secondary Button States */}
          <StratusCard>
            <h3 className="mb-4">Secondary Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="secondary">Secondary Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="secondary">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg border-2 border-[#D9DCE1] text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg border-2 border-[#0057FF] text-[#0057FF] flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>

          {/* Ghost Button States */}
          <StratusCard>
            <h3 className="mb-4">Ghost Button</h3>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Default</p>
                <StratusButton variant="ghost">Ghost Button</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Hover (hover over button)</p>
                <StratusButton variant="ghost">Hover State</StratusButton>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Disabled</p>
                <button disabled className="px-6 py-3 rounded-lg text-[#8B8F99] cursor-not-allowed">
                  Disabled
                </button>
              </div>
              <div>
                <p className="text-sm text-[#6A6D72] mb-2">Loading</p>
                <button className="px-6 py-3 rounded-lg text-[#0057FF] flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
                  Loading...
                </button>
              </div>
            </div>
          </StratusCard>
        </div>
      </section>

      {/* Input Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Inputs</h2>
        <p className="text-[#6A6D72] mb-6">Input field variants and states</p>
        
        <StratusCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Default</p>
              <StratusInput placeholder="Enter text..." />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Filled</p>
              <StratusInput 
                value={filledInputValue} 
                onChange={(e) => setFilledInputValue(e.target.value)}
              />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Focus (click to focus)</p>
              <StratusInput placeholder="Click to focus" />
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Error State</p>
              <input
                placeholder="Invalid input"
                className="w-full h-[44px] px-4 rounded-md border-2 border-[#D9534F] placeholder:text-[#8B8F99] focus:outline-none focus:ring-2 focus:ring-[#D9534F]/20"
              />
              <p className="text-sm text-[#D9534F] mt-1">This field is required</p>
            </div>
          </div>
        </StratusCard>
      </section>

      {/* Badge Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Badges</h2>
        <p className="text-[#6A6D72] mb-6">Status and category badges</p>
        
        <StratusCard>
          <div className="flex flex-wrap items-center gap-3">
            <StratusBadge variant="winnable">Winnable (92%)</StratusBadge>
            <StratusBadge variant="moderate">Moderate (68%)</StratusBadge>
            <StratusBadge variant="avoid">Avoid (34%)</StratusBadge>
            <StratusBadge variant="info">Information</StratusBadge>
          </div>
        </StratusCard>
      </section>

      {/* Card Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Cards</h2>
        <p className="text-[#6A6D72] mb-6">Card variants and states</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StratusCard>
            <h3 className="mb-2">Default Card</h3>
            <p className="text-[#6A6D72]">Standard card with white background and subtle shadow.</p>
          </StratusCard>
          
          <StratusCard onClick={() => {}}>
            <h3 className="mb-2">Hover Card</h3>
            <p className="text-[#6A6D72]">Hover to see elevated shadow effect.</p>
          </StratusCard>
          
          <StratusCard className="border-2 border-[#0057FF] bg-[#0057FF]/5">
            <h3 className="mb-2">Selected Card</h3>
            <p className="text-[#6A6D72]">Active/selected state with border.</p>
          </StratusCard>
        </div>
      </section>

      {/* Logo Variants */}
      <section>
        <h2 className="text-[#01204A] mb-2">Logo Concepts</h2>
        <p className="text-[#6A6D72] mb-6">Four logo variations for STRATUSONE OS</p>
        
        <StratusCard>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="loop" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">OS Loop</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="layers" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">Stacked Layers</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="snode" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">S-Node Matrix</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-[#F7F9FA] rounded-lg">
                <StratusLogo variant="lightning" size={60} />
              </div>
              <p className="text-sm text-[#6A6D72] text-center">Lightning Command</p>
            </div>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}

function MoleculesTab() {
  const [taskChecked, setTaskChecked] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Opportunity Card</h2>
        <p className="text-[#6A6D72] mb-6">Complex card component for displaying opportunities</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OpportunityCard
            title="Enterprise CRM Implementation"
            score={92}
            deadline="Dec 15, 2025"
            value="$45,000"
            reasoning="You've completed 3 similar projects with 100% success rate. Client is in your network and values your expertise."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Small Business Website Redesign"
            score={68}
            deadline="Jan 10, 2026"
            value="$8,500"
            reasoning="Moderate fit. You have the skills but limited experience in this exact industry vertical."
            scoreVariant="moderate"
          />
          <OpportunityCard
            title="Complex Blockchain Integration"
            score={34}
            deadline="Dec 1, 2025"
            value="$65,000"
            reasoning="High technical requirements outside your core expertise. Timeline is tight and budget expectations may be unrealistic."
            scoreVariant="avoid"
          />
        </div>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Task Row</h2>
        <p className="text-[#6A6D72] mb-6">Interactive task list item with checkbox and status</p>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <TaskRow
            title="Complete initial discovery call"
            dueTime="2:00 PM"
            status="in-progress"
            checked={taskChecked}
            onCheck={setTaskChecked}
          />
          <TaskRow
            title="Send proposal document"
            dueTime="5:00 PM"
            status="pending"
          />
          <TaskRow
            title="Follow up with client"
            dueTime="10:00 AM"
            status="completed"
            checked={true}
          />
        </div>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Pipeline Column</h2>
        <p className="text-[#6A6D72] mb-6">Kanban-style column for pipeline management</p>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          <PipelineColumn
            title="Qualified"
            count={3}
            color="#0057FF"
            opportunities={[
              { id: '1', title: 'E-commerce Platform Build', value: '$25,000' },
              { id: '2', title: 'Mobile App Development', value: '$40,000' },
              { id: '3', title: 'API Integration Project', value: '$15,000' }
            ]}
          />
          <PipelineColumn
            title="Proposal Sent"
            count={2}
            color="#35CFFF"
            opportunities={[
              { id: '4', title: 'Website Redesign', value: '$12,000' },
              { id: '5', title: 'CRM Customization', value: '$18,000' }
            ]}
          />
          <PipelineColumn
            title="Negotiation"
            count={1}
            color="#27AE60"
            opportunities={[
              { id: '6', title: 'Enterprise Integration', value: '$55,000' }
            ]}
          />
        </div>
      </section>
    </div>
  );
}

function ColorsTab() {
  const colorGroups = [
    {
      title: 'Core Brand Colors',
      colors: [
        { name: 'Stratus Blue', hex: '#0057FF', var: '--color-stratus-blue' },
        { name: 'Stratus Navy', hex: '#01204A', var: '--color-stratus-navy' },
        { name: 'Stratus Cyan', hex: '#35CFFF', var: '--color-stratus-cyan' }
      ]
    },
    {
      title: 'Neutral System',
      colors: [
        { name: 'Black', hex: '#0A0A0A', var: '--color-black' },
        { name: 'Dark Grey', hex: '#1E1F22', var: '--color-dark-grey' },
        { name: 'Mid Grey', hex: '#6A6D72', var: '--color-mid-grey' },
        { name: 'Light Grey', hex: '#E8EAED', var: '--color-light-grey' },
        { name: 'Off White', hex: '#F7F9FA', var: '--color-off-white' }
      ]
    },
    {
      title: 'Functional Colors',
      colors: [
        { name: 'Success', hex: '#27AE60', var: '--color-success' },
        { name: 'Warning', hex: '#E2B93B', var: '--color-warning' },
        { name: 'Danger', hex: '#D9534F', var: '--color-danger' },
        { name: 'Information', hex: '#3378FF', var: '--color-information' }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-12">
      {colorGroups.map((group) => (
        <section key={group.title}>
          <h2 className="text-[#01204A] mb-2">{group.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {group.colors.map((color) => (
              <StratusCard key={color.hex}>
                <div className="flex flex-col gap-3">
                  <div 
                    className="h-24 rounded-lg"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="mb-1">{color.name}</p>
                    <p className="text-sm text-[#6A6D72] font-mono">{color.hex}</p>
                    <p className="text-sm text-[#6A6D72] font-mono break-all">{color.var}</p>
                  </div>
                </div>
              </StratusCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TypographyTab() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Headings</h2>
        <StratusCard className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H1 - 32px / Bold</p>
              <h1>The quick brown fox jumps over the lazy dog</h1>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H2 - 26px / SemiBold</p>
              <h2>The quick brown fox jumps over the lazy dog</h2>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">H3 - 22px / Medium</p>
              <h3>The quick brown fox jumps over the lazy dog</h3>
            </div>
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Body Text</h2>
        <StratusCard className="mb-6">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body L - 18px</p>
              <p style={{ fontSize: '18px' }}>The quick brown fox jumps over the lazy dog. This is large body text used for emphasis or introductory paragraphs.</p>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body M - 16px (Default)</p>
              <p>The quick brown fox jumps over the lazy dog. This is the standard body text size used throughout the interface.</p>
            </div>
            <div>
              <p className="text-sm text-[#6A6D72] mb-2">Body S - 14px</p>
              <p style={{ fontSize: '14px' }}>The quick brown fox jumps over the lazy dog. This is small body text used for captions and secondary information.</p>
            </div>
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Monospace (JetBrains Mono)</h2>
        <StratusCard>
          <p className="text-sm text-[#6A6D72] mb-2">For numbers, tables, and calculators</p>
          <p className="font-mono">$45,000.00 | 2025-12-15 | 92% | ID: ABC-123-XYZ</p>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Font Weights</h2>
        <StratusCard>
          <div className="flex flex-col gap-3">
            <p style={{ fontWeight: 400 }}>Regular (400) - The quick brown fox</p>
            <p style={{ fontWeight: 500 }}>Medium (500) - The quick brown fox</p>
            <p style={{ fontWeight: 600 }}>SemiBold (600) - The quick brown fox</p>
            <p style={{ fontWeight: 700 }}>Bold (700) - The quick brown fox</p>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}

function LayoutTab() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="text-[#01204A] mb-2">Spacing System</h2>
        <StratusCard>
          <div className="flex flex-col gap-4">
            {[
              { label: 'XS', value: '8px' },
              { label: 'S', value: '12px' },
              { label: 'M', value: '20px' },
              { label: 'L', value: '32px' },
              { label: 'XL', value: '48px' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <span className="w-12 text-[#6A6D72]">{item.label}</span>
                <div 
                  className="h-8 bg-[#0057FF] rounded"
                  style={{ width: item.value }}
                />
                <span className="font-mono text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </StratusCard>
      </section>

      <section>
        <h2 className="text-[#01204A] mb-2">Container & Grid</h2>
        <StratusCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Container Width</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Desktop</span>
                  <span className="font-mono text-sm">1200px</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Mobile</span>
                  <span className="font-mono text-sm">360–500px</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Grid System</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Columns</span>
                  <span className="font-mono text-sm">12</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-[#6A6D72]">Gutter</span>
                  <span className="font-mono text-sm">24px</span>
                </div>
              </div>
            </div>
          </div>
        </StratusCard>
      </section>
    </div>
  );
}

// OS SCREENS

function DashboardScreen() {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0057FF] to-[#01204A] rounded-xl">
        <h1 className="text-white mb-2">Good Morning, Joshkie.</h1>
        <p className="text-[#35CFFF]">You have 12 active opportunities worth $340,000</p>
      </div>

      <div>
        <h2 className="text-[#01204A] mb-4">Top 3 Opportunities Today</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OpportunityCard
            title="Enterprise CRM Implementation"
            score={92}
            deadline="Dec 15, 2025"
            value="$45,000"
            reasoning="Perfect fit. You've done this 3 times before with 100% success."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Marketing Automation Setup"
            score={87}
            deadline="Dec 20, 2025"
            value="$28,000"
            reasoning="Strong match. Client is warm lead from your network."
            scoreVariant="winnable"
          />
          <OpportunityCard
            title="Custom Dashboard Build"
            score={74}
            deadline="Jan 5, 2026"
            value="$15,000"
            reasoning="Good opportunity. Requires some new skills but achievable."
            scoreVariant="moderate"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-[#1E1F22] mb-4">Quick Wins Today</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Send follow-up to Acme Corp" dueTime="10:00 AM" status="pending" />
            <TaskRow title="Finalize proposal for Tech Startup" dueTime="2:00 PM" status="in-progress" />
            <TaskRow title="Schedule demo call" dueTime="4:00 PM" status="pending" />
          </div>
        </div>

        <div>
          <h3 className="text-[#1E1F22] mb-4">Pipeline Summary</h3>
          <StratusCard className="bg-[#F7F9FA]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Qualified</span>
                <span className="font-mono">8 ($180K)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Proposal Sent</span>
                <span className="font-mono">5 ($95K)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6A6D72]">Negotiation</span>
                <span className="font-mono">2 ($65K)</span>
              </div>
              <div className="h-px bg-[#E8EAED] my-2" />
              <div className="flex justify-between items-center">
                <span>Total Pipeline</span>
                <span className="font-mono text-[#0057FF]">15 ($340K)</span>
              </div>
            </div>
          </StratusCard>
        </div>
      </div>
    </div>
  );
}

function OpportunityFeedScreen() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-[#01204A] mb-1">Opportunity Feed</h2>
          <p className="text-[#6A6D72]">24 opportunities matched to your profile</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-[#0057FF] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('winnable')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'winnable' ? 'bg-[#27AE60] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            Winnable
          </button>
          <button
            onClick={() => setFilter('moderate')}
            className={`px-4 py-2 rounded-lg transition-colors ${filter === 'moderate' ? 'bg-[#E2B93B] text-white' : 'bg-white text-[#6A6D72] border border-[#E8EAED]'}`}
          >
            Moderate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => {
          const variants = ['winnable', 'moderate', 'avoid'] as const;
          const titles = [
            'Enterprise CRM Implementation',
            'Website Redesign Project',
            'Mobile App Development',
            'Marketing Automation',
            'E-commerce Platform',
            'Custom Dashboard',
            'API Integration',
            'Database Migration',
            'Cloud Infrastructure'
          ];
          const variant = variants[i % 3];
          const scores = [92, 68, 34];
          
          return (
            <OpportunityCard
              key={i}
              title={titles[i]}
              score={scores[i % 3]}
              deadline={`Dec ${15 + i}, 2025`}
              value={`$${(15 + i * 5)},000`}
              reasoning={variant === 'winnable' ? 'Strong match with your experience.' : variant === 'moderate' ? 'Moderate fit for your skills.' : 'Outside core expertise area.'}
              scoreVariant={variant}
            />
          );
        })}
      </div>

      <div className="flex justify-center gap-2 pt-4">
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">Previous</button>
        <button className="px-4 py-2 bg-[#0057FF] text-white rounded-lg">1</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">2</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">3</button>
        <button className="px-4 py-2 bg-white border border-[#E8EAED] rounded-lg hover:bg-[#F7F9FA]">Next</button>
      </div>
    </div>
  );
}

function OpportunityDetailScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-[#01204A] mb-2">Enterprise CRM Implementation</h1>
            <p className="text-[#6A6D72]">Acme Corporation • Posted 2 days ago</p>
          </div>
          <StratusBadge variant="winnable">92% Match</StratusBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Value</p>
            <p className="font-mono">$45,000</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Deadline</p>
            <p className="font-mono">Dec 15, 2025</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-[#6A6D72] text-sm mb-1">Timeline</p>
            <p className="font-mono">8-10 weeks</p>
          </StratusCard>
        </div>

        <div className="mb-8">
          <div className="bg-[#27AE60]/10 border-2 border-[#27AE60] rounded-xl p-6">
            <h3 className="text-[#27AE60] mb-3">Why You Can Win</h3>
            <ul className="flex flex-col gap-2 text-[#1E1F22]">
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>You've completed 3 similar CRM projects with 100% success rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Client is in your professional network (2nd degree connection)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Timeline aligns perfectly with your current schedule</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#27AE60] mt-1">✓</span>
                <span>Budget matches your standard pricing (±5%)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Requirements</h3>
          <StratusCard className="bg-[#F7F9FA]">
            <ul className="flex flex-col gap-2 text-[#1E1F22]">
              <li>• Salesforce experience (you have: Expert level)</li>
              <li>• API integration capabilities (you have: Advanced)</li>
              <li>• Data migration expertise (you have: Intermediate)</li>
              <li>• Team collaboration tools (you have: Expert level)</li>
            </ul>
          </StratusCard>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Suggested Next Steps</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Review full project requirements document" dueTime="Next 30 min" status="pending" />
            <TaskRow title="Prepare customized proposal using template #3" dueTime="Today 3:00 PM" status="pending" />
            <TaskRow title="Schedule intro call with decision maker" dueTime="Tomorrow" status="pending" />
          </div>
        </div>

        <StratusButton variant="primary" fullWidth>
          Start Pursuing This Opportunity
        </StratusButton>
      </StratusCard>
    </div>
  );
}

function TaskPackScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review project requirements', completed: true },
    { id: 2, title: 'Research client background', completed: true },
    { id: 3, title: 'Draft proposal outline', completed: false },
    { id: 4, title: 'Calculate project pricing', completed: false },
    { id: 5, title: 'Prepare case studies', completed: false },
    { id: 6, title: 'Schedule follow-up call', completed: false }
  ]);

  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-6">
          <h2 className="text-[#01204A] mb-1">Task Pack</h2>
          <p className="text-[#6A6D72]">Enterprise CRM Implementation - Step by step execution</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-2 bg-[#E8EAED] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0057FF] transition-all duration-300"
                style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono text-[#6A6D72]">
              {tasks.filter(t => t.completed).length}/{tasks.length}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {tasks.map((task, index) => (
            <div key={task.id}>
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${task.completed ? 'bg-[#27AE60]' : 'bg-[#E8EAED]'}`}>
                  <span className={`text-sm ${task.completed ? 'text-white' : 'text-[#6A6D72]'}`}>
                    {index + 1}
                  </span>
                </div>
                
                <StratusCard className={`flex-1 ${task.completed ? 'bg-[#F7F9FA]' : 'border-2 border-[#0057FF]'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`mb-2 ${task.completed ? 'text-[#6A6D72] line-through' : 'text-[#01204A]'}`}>
                        {task.title}
                      </h3>
                      <p className="text-sm text-[#6A6D72] mb-3">
                        {index === 0 && 'Read through the complete project requirements document'}
                        {index === 1 && 'Research the client company, industry, and decision makers'}
                        {index === 2 && 'Create a structured outline for your proposal'}
                        {index === 3 && 'Use the quote generator to calculate accurate pricing'}
                        {index === 4 && 'Select relevant case studies that demonstrate your expertise'}
                        {index === 5 && 'Book a call to discuss the proposal with the client'}
                      </p>
                      {!task.completed && (
                        <StratusButton 
                          variant="primary"
                          onClick={() => {
                            const newTasks = [...tasks];
                            newTasks[index].completed = true;
                            setTasks(newTasks);
                          }}
                        >
                          Complete Step
                        </StratusButton>
                      )}
                      {task.completed && (
                        <StratusBadge variant="winnable">
                          ✓ Completed
                        </StratusBadge>
                      )}
                    </div>
                  </div>
                </StratusCard>
              </div>
              
              {index < tasks.length - 1 && (
                <div className="ml-4 h-6 w-px bg-[#E8EAED]" />
              )}
            </div>
          ))}
        </div>
      </StratusCard>
    </div>
  );
}

function QuoteGeneratorScreen() {
  return (
    <div className="max-w-5xl">
      <QuoteGenerator />
    </div>
  );
}

function EmailBuilderScreen() {
  const [emailTo, setEmailTo] = useState('client@acmecorp.com');
  const [emailSubject, setEmailSubject] = useState('Proposal for Enterprise CRM Implementation');
  const [emailContent, setEmailContent] = useState(`Hi [Client Name],

Thank you for the opportunity to propose on your Enterprise CRM Implementation project.

Based on our initial discussion, I've prepared a comprehensive proposal that outlines:

• Project timeline and milestones
• Technical approach and architecture
• Team composition and expertise
• Detailed pricing breakdown

I believe this project aligns perfectly with your goals, and my experience with similar implementations positions me to deliver exceptional results.

I'd love to schedule a call to walk through the proposal and answer any questions you may have.

Best regards,
Joshkie`);

  return (
    <div className="max-w-6xl">
      <StratusCard>
        <div className="mb-6">
          <h2 className="text-[#01204A] mb-1">Email Builder</h2>
          <p className="text-[#6A6D72]">Craft the perfect outreach email</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h3 className="text-[#1E1F22]">Compose</h3>
            
            <StratusInput 
              label="To" 
              value={emailTo} 
              onChange={(e) => setEmailTo(e.target.value)}
            />
            <StratusInput 
              label="Subject" 
              value={emailSubject} 
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#1E1F22]">Message</label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-64 px-4 py-3 rounded-md border border-[#D9DCE1] placeholder:text-[#8B8F99] focus:outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 transition-all resize-none"
              />
            </div>

            <div className="flex gap-3">
              <StratusButton variant="primary">Send Email</StratusButton>
              <StratusButton variant="secondary">Copy to Clipboard</StratusButton>
              <StratusButton variant="ghost">Save Draft</StratusButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[#1E1F22]">Preview</h3>
            
            <StratusCard className="bg-[#F7F9FA]">
              <div className="mb-4 pb-4 border-b border-[#E8EAED]">
                <p className="text-sm text-[#6A6D72] mb-1">From: you@yourdomain.com</p>
                <p className="text-sm text-[#6A6D72] mb-1">To: {emailTo}</p>
                <p className="text-sm mb-1">Subject: {emailSubject}</p>
              </div>
              
              <div className="whitespace-pre-wrap text-sm">
                {emailContent}
              </div>
            </StratusCard>

            <div className="bg-[#35CFFF]/10 border border-[#35CFFF] rounded-lg p-4">
              <h3 className="text-[#01204A] mb-2">AI Suggestions</h3>
              <ul className="text-sm text-[#6A6D72] flex flex-col gap-2">
                <li>• Consider adding a specific timeline for response</li>
                <li>• Mention 2-3 key differentiators</li>
                <li>• Include a clear call-to-action</li>
              </ul>
            </div>
          </div>
        </div>
      </StratusCard>
    </div>
  );
}

function PipelineBoardScreen() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-[#01204A] mb-1">Pipeline Board</h2>
        <p className="text-[#6A6D72]">Drag and drop opportunities between stages</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <PipelineColumn
          title="Qualified"
          count={8}
          color="#0057FF"
          opportunities={[
            { id: '1', title: 'E-commerce Platform Build', value: '$25,000' },
            { id: '2', title: 'Mobile App Development', value: '$40,000' },
            { id: '3', title: 'API Integration Project', value: '$15,000' },
            { id: '4', title: 'Website Redesign', value: '$12,000' }
          ]}
        />
        <PipelineColumn
          title="Proposal Sent"
          count={5}
          color="#35CFFF"
          opportunities={[
            { id: '5', title: 'CRM Customization', value: '$18,000' },
            { id: '6', title: 'Marketing Automation', value: '$22,000' },
            { id: '7', title: 'Data Migration', value: '$14,000' }
          ]}
        />
        <PipelineColumn
          title="Negotiation"
          count={2}
          color="#E2B93B"
          opportunities={[
            { id: '8', title: 'Enterprise Integration', value: '$55,000' },
            { id: '9', title: 'Custom Dashboard', value: '$28,000' }
          ]}
        />
        <PipelineColumn
          title="Closing"
          count={3}
          color="#27AE60"
          opportunities={[
            { id: '10', title: 'SaaS Platform Build', value: '$75,000' },
            { id: '11', title: 'Legacy System Upgrade', value: '$32,000' }
          ]}
        />
        <PipelineColumn
          title="Won"
          count={12}
          color="#27AE60"
          opportunities={[
            { id: '12', title: 'E-learning Portal', value: '$38,000' }
          ]}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StratusCard className="bg-[#0057FF]/5 border-2 border-[#0057FF]">
          <p className="text-sm text-[#6A6D72] mb-1">Total Opportunities</p>
          <p className="font-mono">30</p>
        </StratusCard>
        <StratusCard className="bg-[#35CFFF]/5 border-2 border-[#35CFFF]">
          <p className="text-sm text-[#6A6D72] mb-1">Pipeline Value</p>
          <p className="font-mono">$340,000</p>
        </StratusCard>
        <StratusCard className="bg-[#27AE60]/5 border-2 border-[#27AE60]">
          <p className="text-sm text-[#6A6D72] mb-1">Win Rate</p>
          <p className="font-mono">78%</p>
        </StratusCard>
        <StratusCard className="bg-[#E2B93B]/5 border-2 border-[#E2B93B]">
          <p className="text-sm text-[#6A6D72] mb-1">Avg. Deal Size</p>
          <p className="font-mono">$28,500</p>
        </StratusCard>
      </div>
    </div>
  );
}

function IdentityProfileScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-8">
          <h2 className="text-[#01204A] mb-1">Identity Profile</h2>
          <p className="text-[#6A6D72]">Your skills, experience, and opportunity fit score</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 mb-4">
            <svg className="transform -rotate-90" width="192" height="192">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#E8EAED"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#0057FF"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${88 * 2 * Math.PI * 0.87} ${88 * 2 * Math.PI}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-[#01204A]" style={{ fontSize: '48px' }}>87%</span>
              <span className="text-sm text-[#6A6D72]">Success Score</span>
            </div>
          </div>
          <p className="text-center text-[#6A6D72]">Based on your experience, skills, and market fit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-[#1E1F22] mb-4">Core Skills</h3>
            <div className="flex flex-col gap-3">
              {[
                { skill: 'CRM Implementation', level: 95 },
                { skill: 'API Development', level: 88 },
                { skill: 'Database Design', level: 82 },
                { skill: 'Project Management', level: 90 },
                { skill: 'Client Communication', level: 93 }
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[#1E1F22]">{item.skill}</span>
                    <span className="text-sm text-[#6A6D72] font-mono">{item.level}%</span>
                  </div>
                  <div className="h-2 bg-[#E8EAED] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#0057FF] rounded-full transition-all"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#1E1F22] mb-4">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Salesforce', 'HubSpot', 'Zapier', 'PostgreSQL', 
                'React', 'Node.js', 'AWS', 'Docker',
                'Git', 'Jira', 'Figma', 'Slack'
              ].map((tool) => (
                <StratusBadge key={tool} variant="info">
                  {tool}
                </StratusBadge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[#1E1F22] mb-4">Portfolio Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Projects Completed</p>
              <p className="font-mono">47</p>
            </StratusCard>
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Client Satisfaction</p>
              <p className="font-mono">4.9/5.0</p>
            </StratusCard>
            <StratusCard className="bg-[#F7F9FA]">
              <p className="text-sm text-[#6A6D72] mb-1">Total Revenue</p>
              <p className="font-mono">$1.2M</p>
            </StratusCard>
          </div>
        </div>

        <div>
          <h3 className="text-[#1E1F22] mb-4">Next 3 Steps to Improve</h3>
          <div className="flex flex-col gap-3">
            <TaskRow title="Complete advanced Salesforce certification" dueTime="This month" status="pending" />
            <TaskRow title="Build portfolio case study for enterprise clients" dueTime="Next 2 weeks" status="in-progress" />
            <TaskRow title="Expand network in fintech industry" dueTime="Ongoing" status="pending" />
          </div>
        </div>
      </StratusCard>
    </div>
  );
}

function SettingsScreen() {
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

function ToggleRow({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[#1E1F22]">{label}</span>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${checked ? 'bg-[#0057FF]' : 'bg-[#E8EAED]'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-7' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function IntegrationCard({ name, status, icon }: { name: string; status: string; icon: string }) {
  const isConnected = status === 'Connected';
  
  return (
    <StratusCard className={isConnected ? 'border-2 border-[#27AE60]' : ''}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="mb-1">{name}</p>
            <p className="text-sm text-[#6A6D72]">{status}</p>
          </div>
        </div>
        <StratusButton variant={isConnected ? 'ghost' : 'secondary'}>
          {isConnected ? 'Disconnect' : 'Connect'}
        </StratusButton>
      </div>
    </StratusCard>
  );
}

function DailyPlannerScreen() {
  return (
    <div className="max-w-4xl">
      <StratusCard>
        <div className="mb-8">
          <h2 className="text-[#01204A] mb-1">Daily Planner</h2>
          <p className="text-[#6A6D72]">Tuesday, November 18, 2025</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[#1E1F22]">Today's Progress</h3>
            <span className="text-sm font-mono text-[#6A6D72]">65% Complete</span>
          </div>
          <div className="h-3 bg-[#E8EAED] rounded-full overflow-hidden">
            <div className="h-full bg-[#0057FF] rounded-full transition-all" style={{ width: '65%' }} />
          </div>
        </div>

        <div className="space-y-6">
          <TimeBlock
            period="Morning"
            time="8:00 AM - 12:00 PM"
            tasks={[
              { title: 'Review new opportunities', time: '8:00 - 9:00', status: 'completed' },
              { title: 'Client call - Acme Corp', time: '9:30 - 10:30', status: 'completed' },
              { title: 'Draft proposal outline', time: '11:00 - 12:00', status: 'in-progress' }
            ]}
          />

          <TimeBlock
            period="Afternoon"
            time="1:00 PM - 5:00 PM"
            tasks={[
              { title: 'Finish proposal document', time: '1:00 - 3:00', status: 'pending' },
              { title: 'Send follow-up emails', time: '3:00 - 4:00', status: 'pending' },
              { title: 'Update pipeline board', time: '4:00 - 5:00', status: 'pending' }
            ]}
          />

          <TimeBlock
            period="Evening"
            time="6:00 PM - 8:00 PM"
            tasks={[
              { title: 'Review daily metrics', time: '6:00 - 6:30', status: 'pending' },
              { title: 'Plan tomorrow\'s priorities', time: '6:30 - 7:00', status: 'pending' }
            ]}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Tasks Completed</p>
            <p className="font-mono">2 / 8</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Time Logged</p>
            <p className="font-mono">3h 30m</p>
          </StratusCard>
          <StratusCard className="bg-[#F7F9FA]">
            <p className="text-sm text-[#6A6D72] mb-1">Focus Score</p>
            <p className="font-mono">8.5/10</p>
          </StratusCard>
        </div>
      </StratusCard>
    </div>
  );
}

function TimeBlock({ period, time, tasks }: { period: string; time: string; tasks: Array<{ title: string; time: string; status: string }> }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-[#1E1F22]">{period}</h3>
        <span className="text-sm text-[#6A6D72]">{time}</span>
      </div>
      <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#E8EAED]">
        {tasks.map((task, i) => (
          <StratusCard key={i} className={
            task.status === 'completed' ? 'bg-[#27AE60]/5 border border-[#27AE60]' :
            task.status === 'in-progress' ? 'bg-[#0057FF]/5 border border-[#0057FF]' :
            'bg-white'
          }>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={task.status === 'completed' ? 'line-through text-[#6A6D72]' : 'text-[#1E1F22]'}>
                  {task.title}
                </p>
                <p className="text-sm text-[#6A6D72] font-mono">{task.time}</p>
              </div>
              <StratusBadge 
                variant={
                  task.status === 'completed' ? 'winnable' :
                  task.status === 'in-progress' ? 'info' :
                  'moderate'
                }
              >
                {task.status === 'completed' ? 'Done' : task.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </StratusBadge>
            </div>
          </StratusCard>
        ))}
      </div>
    </div>
  );
}
