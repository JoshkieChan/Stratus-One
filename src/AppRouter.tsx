import { useState } from "react";
import { useWorkspaceRoute } from './hooks/useWorkspaceRoute';
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from './hooks/AuthProvider';
import {
  LoginPage,
  DashboardPage,
  OpportunityFeedPage,
  TaskPackPage,
  QuoteGeneratorPage,
  PipelineBoardPage,
  SettingsPage,
} from "./components/screens";
import { StratusLogo } from "./components/StratusLogo";
import { ThemeToggle } from "./components/ThemeToggle";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Mail,
  Trello,
  User,
  Settings,
  Calendar,
  Menu,
  X,
  TrendingUp,
} from "lucide-react";


export default function AppRouter() {
  return <AuthProvider><AuthenticatedWorkspace /></AuthProvider>;
}

function AuthenticatedWorkspace() {
  const { user, loading } = useAuth();
  if (loading) return <p role="status" className="p-8">Loading session…</p>;
  if (!user) return <LoginPage />;
  return <Workspace key={user.id} />;
}

function Workspace() {
  const { user, loading } = useAuth();
  const { page: activePage, opportunityId: selectedId, navigate: setActivePage } = useWorkspaceRoute();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-secondary)] flex items-center justify-center">
        <div className="text-center">
          <StratusLogo variant="loop" size={64} />
          <p className="mt-4 text-[var(--color-fg-secondary)]">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-secondary)] flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-0"} bg-[var(--color-bg-primary)] border-r border-[var(--color-border-default)] transition-all duration-300 overflow-hidden flex-shrink-0`}
      >
        <div className="p-6 border-b border-[var(--color-border-default)]">
          <div className="flex items-center gap-3">
            <StratusLogo variant="loop" size={32} />
            <div>
              <h3 className="text-[var(--color-fg-primary)]">
                STRATUSONE
              </h3>
              <p className="text-sm text-[var(--color-fg-secondary)]">
                OS v1.0
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="mb-6">
            <p className="text-xs text-[var(--color-fg-secondary)] px-3 mb-2 uppercase tracking-wider">
              Main
            </p>
            <NavButton
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Dashboard"
              active={activePage === "dashboard"}
              onClick={() => setActivePage("dashboard")}
            />
            <NavButton
              icon={<FileText className="w-4 h-4" />}
              label="Opportunity Feed"
              active={activePage === "feed"}
              onClick={() => setActivePage("feed")}
            />
            <NavButton
              icon={<Trello className="w-4 h-4" />}
              label="Pipeline Board"
              active={activePage === "pipeline"}
              onClick={() => setActivePage("pipeline")}
            />
          </div>

          <div className="mb-6">
            <p className="text-xs text-[var(--color-fg-secondary)] px-3 mb-2 uppercase tracking-wider">
              Tools
            </p>
            <NavButton
              icon={<ClipboardList className="w-4 h-4" />}
              label="Task Pack"
              active={activePage === "taskpack"}
              onClick={() => setActivePage("taskpack")}
            />
            <NavButton
              icon={<TrendingUp className="w-4 h-4" />}
              label="Quote Generator"
              active={activePage === "quotegen"}
              onClick={() => setActivePage("quotegen")}
            />
            <NavButton
              icon={<Mail className="w-4 h-4" />}
              label="Email Builder"
              active={activePage === "email"}
              onClick={() => setActivePage("email")}
            />
            <NavButton
              icon={<Calendar className="w-4 h-4" />}
              label="Daily Planner"
              active={activePage === "planner"}
              onClick={() => setActivePage("planner")}
            />
          </div>

          <div>
            <p className="text-xs text-[var(--color-fg-secondary)] px-3 mb-2 uppercase tracking-wider">
              Account
            </p>
            <NavButton
              icon={<User className="w-4 h-4" />}
              label="Identity Profile"
              active={activePage === "profile"}
              onClick={() => setActivePage("profile")}
            />
            <NavButton
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              active={activePage === "settings"}
              onClick={() => setActivePage("settings")}
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
              aria-label="Toggle navigation"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors flex-shrink-0"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1" />

            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="?mode=showcase">Design showcase</a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 overflow-y-auto">
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "feed" && <OpportunityFeedPage onSelect={id => { setActivePage('taskpack', id); }} />}
          {activePage === "taskpack" && <TaskPackPage key={selectedId} opportunityId={selectedId} />}
          {activePage === "quotegen" && <QuoteGeneratorPage key={selectedId} opportunityId={selectedId} />}
          {activePage === "pipeline" && <PipelineBoardPage />}
          {activePage === "settings" && <SettingsPage />}
          {activePage === "email" && (
            <div className="text-center py-12">
              <p className="text-[var(--color-fg-secondary)]">
                Email Builder - Coming Soon
              </p>
            </div>
          )}
          {activePage === "planner" && (
            <div className="text-center py-12">
              <p className="text-[var(--color-fg-secondary)]">
                Daily Planner - Coming Soon
              </p>
            </div>
          )}
          {activePage === "profile" && (
            <div className="text-center py-12">
              <p className="text-[var(--color-fg-secondary)]">
                Identity Profile - Coming Soon
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all mb-1 ${
        active
          ? "bg-[var(--color-accent-primary)] text-white shadow-sm"
          : "text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)]"
      }`}
    >
      {icon}
      <span className="text-sm whitespace-nowrap">{label}</span>
    </button>
  );
}
