import { test, expect } from '@playwright/test';
test('showcase renders, calculates markup and retains theme after reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('Design showcase');
  await page.getByRole('button', { name: 'Quote Generator', exact: true }).click();
  await page.getByLabel('Base Cost', { exact: true }).fill('100');
  await expect(page.getByText('$130.00', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
});
test('unauthenticated deep links show login without discarding the route', async ({ page }) => {
  await page.goto('/?mode=app#page=quotegen&opportunity=11111111-1111-4111-8111-111111111111');
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
  await expect(page).toHaveURL(/page=quotegen/);
});
test('signed-in fixture restores routes and reports pipeline write failure', async ({ page }) => {
  // Browser integration fixture; hosted Supabase is deliberately not contacted.
  const id = '11111111-1111-4111-8111-111111111111';
  const user = { id, aud: 'authenticated', role: 'authenticated', email: 'test@example.com', app_metadata: {}, user_metadata: {}, created_at: new Date().toISOString() };
  await page.addInitScript(({ user }) => {
    const encode = (value: object) => btoa(JSON.stringify(value)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const exp = Math.floor(Date.now()/1000) + 3600;
    const access_token = `${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:user.id,exp,role:'authenticated'})}.test`;
    localStorage.setItem('sb-stratus-test-auth-token', JSON.stringify({ access_token, refresh_token: 'fixture', token_type: 'bearer', expires_at: exp, expires_in: 3600, user }));
  }, { user });
  await page.route('https://stratus-test.supabase.co/**', async route => {
    const url = route.request().url();
    if (url.includes('/auth/v1/user')) return route.fulfill({ json: user });
    if (route.request().method() === 'PATCH') return route.fulfill({ status: 500, json: { message: 'Fixture write failure' } });
    if (url.includes('/rest/v1/opportunities')) return route.fulfill({ json: [{ id, user_id: id, title: 'Browser contract', agency: 'Agency', description: 'Example', value: 100, status: 'open', winnability_score: 50, deadline: '2027-01-01' }], headers: { 'content-range': '0-0/1' } });
    return route.fulfill({ json: [] });
  });
  await page.goto('/?mode=app#page=pipeline');
  await page.getByLabel('Stage for Browser contract').selectOption('won');
  await expect(page.getByRole('alert')).toContainText('previous stage');
  await expect(page.getByLabel('Stage for Browser contract')).toHaveValue('open');
  await page.getByRole('button', { name: 'Opportunity Feed', exact: true }).click();
  await expect(page).toHaveURL(/page=feed/);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Opportunity Feed' })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Pipeline Board' })).toBeVisible();
  await page.route('https://stratus-test.supabase.co/rest/v1/quotes**', async route => {
    if (route.request().method() === 'PATCH') return route.fulfill({ json: [] });
    const quote = { id, opportunity_id: id, user_id: id, quote_number: 'Q-browser', title: 'Saved quote', status: 'draft', version: 1, line_items: [{ description: 'Work', quantity: 2, unitPrice: 10, total: 20 }], tax_rate: 0.1, total: 22 };
    return route.fulfill({ json: route.request().headers().accept?.includes('vnd.pgrst.object') ? quote : [quote] });
  });
  await page.goto(`/?mode=app#page=quotegen&opportunity=${id}`);
  await page.getByRole('button', { name: 'Edit Saved quote' }).click();
  await page.getByLabel('Quote Title').fill('My unsaved edit');
  await page.getByRole('button', { name: 'Save Quote', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Quote changed' })).toBeVisible();
  await expect(page.getByLabel('Quote Title')).toHaveValue('My unsaved edit');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.quote-print')).toBeVisible();
  await expect(page.locator('.quote-print')).toContainText('$22.00');
});
