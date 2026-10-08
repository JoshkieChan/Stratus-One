// @vitest-environment jsdom
import { afterEach, expect, it } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import { parseRoute, useWorkspaceRoute } from './useWorkspaceRoute';
afterEach(() => { cleanup(); window.history.replaceState(null, '', '/'); });
it('rejects invalid routes and IDs', () => {
  expect(parseRoute('#page=unknown&opportunity=oops')).toEqual({ page: 'dashboard', opportunityId: undefined });
});
it('restores a deep link and responds to browser navigation', () => {
  const id = '11111111-1111-4111-8111-111111111111';
  window.history.replaceState(null, '', `/?mode=app#page=taskpack&opportunity=${id}`);
  const { result } = renderHook(useWorkspaceRoute);
  expect(result.current.opportunityId).toBe(id);
  act(() => result.current.navigate('quotegen'));
  expect(window.location.hash).toContain('page=quotegen');
  expect(result.current.opportunityId).toBe(id);
  act(() => { window.location.hash = 'page=feed'; window.dispatchEvent(new HashChangeEvent('hashchange')); });
  expect(result.current.page).toBe('feed');
});
