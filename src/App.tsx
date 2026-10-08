import { useState } from 'react';
import { StratusLogo } from './components/StratusLogo';
import { ThemeToggle } from './components/ThemeToggle';
import { DesignTokensScreen } from './components/DesignTokensScreen';
import {
  Menu, X, Palette, Type, Layout, Box, Layers,
  LayoutDashboard, FileText, ClipboardList, Mail,
  Trello, User, Settings, Calendar
} from 'lucide-react';

import { AtomsTab } from './showcase/AtomsTab';
import { MoleculesTab } from './showcase/MoleculesTab';
import { ColorsTab } from './showcase/ColorsTab';
import { TypographyTab } from './showcase/TypographyTab';
import { LayoutTab } from './showcase/LayoutTab';
import { DashboardScreen } from './showcase/DashboardScreen';
import { OpportunityFeedScreen } from './showcase/OpportunityFeedScreen';
import { OpportunityDetailScreen } from './showcase/OpportunityDetailScreen';
import { TaskPackScreen } from './showcase/TaskPackScreen';
import { QuoteGeneratorScreen } from './showcase/QuoteGeneratorScreen';
import { EmailBuilderScreen } from './showcase/EmailBuilderScreen';
import { PipelineBoardScreen } from './showcase/PipelineBoardScreen';
import { IdentityProfileScreen } from './showcase/IdentityProfileScreen';
import { SettingsScreen } from './showcase/SettingsScreen';
import { DailyPlannerScreen } from './showcase/DailyPlannerScreen';
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
              <a href="https://github.com/JoshkieChan/Stratus-One#readme">Documentation</a>
              <a href="?mode=app">Open application</a>
            </div>
          </div>
        </header>

        <p role="status" className="p-4">Design showcase — sample data and illustrative controls; changes are not saved. Use Open application for Supabase workflows.</p>
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
