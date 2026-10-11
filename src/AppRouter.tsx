import { useState } from 'react';
import { useWorkspaceRoute, type PageRoute } from './hooks/useWorkspaceRoute';
import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './hooks/AuthProvider';
import { LoginPage, DashboardPage, OpportunityFeedPage, TaskPackPage, QuoteGeneratorPage, PipelineBoardPage, SettingsPage } from './components/screens';
import { OpportunityDetailPage } from './components/screens/OpportunityDetailPage';
import { OpportunityPicker } from './components/OpportunityPicker';
import { StratusLogo } from './components/StratusLogo';
import { ThemeToggle } from './components/ThemeToggle';
import { isDemoMode } from './lib/mode';
import { DEMO_OPPORTUNITY_ID } from './demo/fixtures';
import { demoStorageAvailable, resetDemo } from './demo/store';
import { Menu, X } from 'lucide-react';
const navigation: { page: PageRoute; label: string }[] = [
  { page: 'dashboard', label: 'Dashboard' }, { page: 'feed', label: 'Opportunity Feed' },
  { page: 'detail', label: 'Opportunity Detail' }, { page: 'taskpack', label: 'Task Workflow' },
  { page: 'quotegen', label: 'Quote Generator' }, { page: 'pipeline', label: 'Pipeline Board' }, { page: 'settings', label: 'Settings' },
];
export default function AppRouter() { return <AuthProvider><AuthenticatedWorkspace /></AuthProvider>; }
function AuthenticatedWorkspace() {
  const { user, loading } = useAuth();
  if (loading) return <p role="status" className="p-8">Loading session…</p>;
  if (!user) return <LoginPage />;
  return <Workspace key={user.id} />;
}
function Workspace() {
  const route = useWorkspaceRoute();
  const demo = isDemoMode();
  const selectedId = route.opportunityId ?? (demo ? DEMO_OPPORTUNITY_ID : undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  function navigate(page: PageRoute, id = selectedId) { route.navigate(page,id); setMenuOpen(false); }
  const contextual = ['detail','taskpack','quotegen'].includes(route.page);
  return <div className="min-h-screen bg-[var(--color-bg-secondary)] text-[var(--color-fg-primary)]">
    <a className="sr-only focus:not-sr-only" href="#workspace-main" onClick={event => { event.preventDefault(); document.getElementById("workspace-main")?.focus(); }}>Skip to content</a>
    <header className="bg-[var(--color-bg-primary)] border-b border-[var(--color-border-default)]">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-8 flex-wrap">
        <StratusLogo size={32} /><span className="font-semibold">Stratus One</span>
        <span className="hidden sm:inline text-sm">Opportunity workspace</span>
        <div className="flex-1" /><ThemeToggle />
        <button className="p-2 md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="workspace-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {demo && <div className="px-4 sm:px-8 py-3 bg-[var(--color-accent-primary)]/10 flex flex-wrap items-center gap-3" aria-label="Demo environment">
        <p className="flex-1 min-w-0 text-sm"><strong>Local demo · fictional data.</strong> {demoStorageAvailable() ? 'Changes stay in this browser tab, including reloads. Use Reset demo to start over.' : 'Browser storage is unavailable; changes last only until reload.'} No remote data is saved.</p>
        <button className="underline text-sm" onClick={() => { if (window.confirm('Reset all demo opportunities, tasks, quotes and profile changes in this tab?')) { resetDemo(); window.location.assign('?mode=demo'); } }}>Reset demo</button>
      </div>}
    </header>
    <div className="md:flex">
      <aside id="workspace-navigation" className={`${menuOpen ? 'block' : 'hidden'} md:block md:w-60 md:shrink-0 bg-[var(--color-bg-primary)] p-4 border-r border-[var(--color-border-default)]`}>
        <nav aria-label="Workspace" className="flex flex-col gap-1">{navigation.map(item => <button key={item.page} aria-current={route.page === item.page ? 'page' : undefined} onClick={() => navigate(item.page)} className={`text-left px-3 py-3 rounded-lg ${route.page === item.page ? 'bg-[var(--color-accent-primary)] text-white' : 'hover:bg-[var(--color-bg-secondary)]'}`}>{item.label}</button>)}</nav>
        <div className="mt-8 flex flex-col gap-3 text-sm px-3"><a className="underline" href="?mode=showcase">Design-system showcase</a><a className="underline" href={demo ? '?mode=app' : '?mode=demo'}>{demo ? 'Connect Supabase' : 'Try local demo'}</a></div>
      </aside>
      <main id="workspace-main" tabIndex={-1} className="flex-1 min-w-0 p-4 sm:p-8">
        {contextual && <OpportunityPicker key={route.page} selectedId={selectedId} onSelect={id => navigate(route.page,id)} />}
        {route.page === 'dashboard' && <DashboardPage onSelect={id => navigate('detail',id)} onBrowse={() => navigate('feed')} />}
        {route.page === 'feed' && <OpportunityFeedPage onSelect={id => navigate('detail',id)} />}
        {route.page === 'detail' && <OpportunityDetailPage opportunityId={selectedId} onTasks={() => navigate('taskpack')} onQuote={() => navigate('quotegen')} />}
        {route.page === 'taskpack' && <TaskPackPage key={selectedId} opportunityId={selectedId} />}
        {route.page === 'quotegen' && <QuoteGeneratorPage key={selectedId} opportunityId={selectedId} />}
        {route.page === 'pipeline' && <PipelineBoardPage />}
        {route.page === 'settings' && <SettingsPage />}
      </main>
    </div>
  </div>;
}
