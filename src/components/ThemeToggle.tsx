import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
const eventName = 'stratus-theme-change';
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    function sync() {
      let saved: string | null = null;
      try { saved = localStorage.getItem('stratusone-theme'); } catch { /* Theme still works without storage. */ }
      const current = saved === 'light' || saved === 'dark' ? saved : document.documentElement.getAttribute('data-theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(current); document.documentElement.setAttribute('data-theme', current);
    }
    sync(); window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, []);
  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next); setTheme(next);
    try { localStorage.setItem('stratusone-theme', next); } catch { /* Local preference persistence is optional. */ }
    window.dispatchEvent(new Event(eventName));
  }
  return <button onClick={toggleTheme} className="p-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-default)] hover:bg-[var(--color-bg-tertiary)] transition-colors" aria-label="Toggle theme" aria-pressed={theme === 'dark'}>{theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}</button>;
}
