export type AppMode = 'demo' | 'app' | 'showcase';
export function getAppMode(): AppMode {
  const value = new URLSearchParams(window.location.search).get('mode');
  return value === 'app' || value === 'showcase' ? value : 'demo';
}
export const isDemoMode = () => getAppMode() === 'demo';
