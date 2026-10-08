import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', fullyParallel: true, forbidOnly: Boolean(process.env.CI), retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:4391', trace: 'retain-on-failure' },
  webServer: { command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4391 --strictPort', url: 'http://127.0.0.1:4391', reuseExistingServer: false,
    env: { VITE_SUPABASE_URL: 'https://stratus-test.supabase.co', VITE_SUPABASE_ANON_KEY: 'sb_publishable_browser_test_fixture' } },
});
