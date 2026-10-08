import { useEffect, useState } from 'react';
export const pages = ['dashboard','feed','taskpack','quotegen','pipeline','settings','email','planner','profile'] as const;
export type PageRoute = typeof pages[number];
export function parseRoute(hash: string): { page: PageRoute; opportunityId?: string } {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const candidate = params.get('page');
  const id = params.get('opportunity');
  return { page: pages.includes(candidate as PageRoute) ? candidate as PageRoute : 'dashboard',
    opportunityId: id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ? id : undefined };
}
export function useWorkspaceRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  useEffect(() => {
    const changed = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', changed);
    return () => window.removeEventListener('hashchange', changed);
  }, []);
  function navigate(page: PageRoute, opportunityId = route.opportunityId) {
    const params = new URLSearchParams({ page });
    if (opportunityId) params.set('opportunity', opportunityId);
    window.location.hash = params.toString();
    setRoute({ page, opportunityId });
  }
  return { ...route, navigate };
}
