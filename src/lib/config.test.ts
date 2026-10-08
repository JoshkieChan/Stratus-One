import { expect, it } from 'vitest';
import { validatePublicConfig } from './config';
it('accepts public configuration and rejects missing or privileged credentials', () => {
  const url = 'https://example.supabase.co';
  expect(validatePublicConfig(url, 'sb_publishable_example')).toBeNull();
  expect(validatePublicConfig(url, `header.${btoa(JSON.stringify({ role: 'anon' }))}.signature`)).toBeNull();
  expect(validatePublicConfig(url, `header.${btoa(JSON.stringify({ role: 'service_role' }))}.signature`)).not.toBeNull();
  expect(validatePublicConfig(url, 'sb_secret_example')).not.toBeNull();
  expect(validatePublicConfig(url, 'bad')).not.toBeNull();
  expect(validatePublicConfig('javascript:alert(1)', 'sb_publishable_example')).not.toBeNull();
  expect(validatePublicConfig(undefined, undefined)).not.toBeNull();
});
