import { test, expect } from '@playwright/test';
const firstId = '22222222-2222-4222-8222-222222222221';
test('demo workflow persists locally, resets, and never contacts a backend', async ({ page }) => {
  const external: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4391/')) external.push(request.url()); });
  await page.goto('/');
  await expect(page.getByLabel('Demo environment')).toContainText('No remote data is saved');
  await expect(page.getByRole('heading', { name: 'Daily Dashboard' })).toBeVisible();
  await page.getByRole('button', { name: 'Browse opportunities' }).click();
  await page.getByRole('button', { name: 'Open opportunity', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Community website accessibility audit' })).toBeVisible();
  await page.getByRole('button', { name: 'Open task workflow' }).click();
  await page.getByLabel('Complete Confirm delivery milestones').check();
  await expect(page.getByLabel('Complete Confirm delivery milestones')).toBeChecked();
  await page.reload();
  await expect(page.getByLabel('Complete Confirm delivery milestones')).toBeChecked();
  await page.getByLabel('New task pack name').fill('Review checklist');
  await page.getByRole('button', { name: 'Create Task Pack' }).click();
  await page.getByLabel('New task for Review checklist').fill('Check scope');
  await page.getByRole('button', { name: 'Add Task', exact: true }).last().click();
  await expect(page.getByLabel('Complete Check scope')).toBeVisible();
  await page.getByRole('button', { name: 'Quote Generator', exact: true }).click();
  await page.getByRole('button', { name: 'Edit Accessibility audit estimate' }).click();
  await page.getByLabel('Quantity 1', { exact: true }).fill('41');
  await page.getByRole('button', { name: 'Save Quote', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Quote saved successfully' })).toBeVisible();
  await expect(page.getByText(/version 2/)).toBeVisible();
  await page.getByRole('button', { name: 'Pipeline Board', exact: true }).click();
  await page.getByLabel('Stage for Community website accessibility audit').selectOption('submitted');
  await page.reload();
  await expect(page.getByLabel('Stage for Community website accessibility audit')).toHaveValue('submitted');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByLabel('Full Name').fill('Local Reviewer');
  await page.getByRole('button', { name: 'Save Profile' }).click();
  await expect(page.getByRole('status')).toHaveText('Profile saved.');
  await page.reload(); await expect(page.getByLabel('Full Name')).toHaveValue('Local Reviewer');
  page.once('dialog', dialog => dialog.dismiss()); await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByLabel('Full Name')).toHaveValue('Local Reviewer');
  page.once('dialog', dialog => dialog.accept()); await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByRole('heading', { name: 'Daily Dashboard' })).toBeVisible();
  expect(external).toEqual([]);
});
test('demo empty results, new opportunity, invalid deep link and history', async ({ page }) => {
  await page.goto('/?mode=demo#page=feed');
  await page.getByLabel('Search opportunities').fill('absent record');
  await expect(page.getByText('No opportunities found')).toBeVisible();
  await page.getByLabel('Search opportunities').fill('');
  await page.getByRole('button', { name: 'New Opportunity', exact: true }).click();
  await page.getByLabel('Opportunity title').fill('Demo proposal');
  await page.getByLabel('Agency or client').fill('Example Client');
  await page.getByLabel('Solicitation number').fill('DEMO-777');
  await page.getByLabel('Category', { exact: true }).fill('IT');
  await page.getByLabel('Description', { exact: true }).fill('Local demo entry');
  await page.getByLabel('Estimated value (USD)').fill('15000');
  await page.getByLabel('Deadline (end of day UTC)').fill('2027-03-01');
  await page.getByRole('button', { name: 'Create Opportunity', exact: true }).click();
  await page.getByRole('button', { name: 'Open opportunity', exact: true }).first().click();
  await expect(page.getByRole('heading', { name: 'Demo proposal' })).toBeVisible();
  await page.goBack(); await expect(page.getByRole('heading', { name: 'Opportunity Feed' })).toBeVisible();
  await page.goForward(); await expect(page.getByRole('heading', { name: 'Demo proposal' })).toBeVisible();
  await page.reload(); await expect(page.getByRole('heading', { name: 'Demo proposal' })).toBeVisible();
  await page.goto('/?mode=demo#page=detail&opportunity=99999999-9999-4999-8999-999999999999');
  await expect(page.getByRole('alert')).toContainText('Opportunity not found');
  await page.getByLabel('Selected opportunity').selectOption(firstId);
  await expect(page.getByRole('heading', { name: 'Community website accessibility audit' })).toBeVisible();
});
for (const width of [1440, 390]) {
  test(`all main screens are visible and fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/?mode=demo');
    for (const [route,heading] of [['dashboard','Daily Dashboard'],['feed','Opportunity Feed'],['detail','Community website accessibility audit'],['taskpack','Task workflow'],['quotegen','Quote Generator'],['pipeline','Pipeline Board'],['settings','Settings']]) {
      await page.goto(`/?mode=demo#page=${route}&opportunity=${firstId}`);
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
      if (route === 'quotegen') await page.getByRole('button', { name: 'Edit Accessibility audit estimate' }).click();
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (['detail','taskpack','quotegen'].includes(route)) await expect.poll(async () => (await page.getByLabel('Selected opportunity').boundingBox())!.width).toBeGreaterThan(250);
      await page.screenshot({ path: `test-results/audit-${width}-${route}.png`, fullPage: true });
    }
    if (width === 390) {
      await page.getByRole('button', { name: 'Toggle navigation' }).click();
      await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Daily Dashboard' })).toBeVisible();
      await expect(page.getByRole('navigation', { name: 'Workspace' })).not.toBeVisible();
    }
  });
}

test('theme controls stay synchronized and local scoring stays bounded', async ({ page }) => {
  await page.goto('/?mode=demo#page=settings');
  await page.getByRole('button', { name: 'Toggle theme' }).last().click();
  await expect(page.getByRole('button', { name: 'Toggle theme' }).first()).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Toggle theme' }).first().click();
  await expect(page.getByRole('button', { name: 'Toggle theme' }).last()).toHaveAttribute('aria-pressed', 'false');
  await page.goto(`/?mode=demo#page=taskpack&opportunity=${firstId}`);
  await page.getByRole('button', { name: 'Recalculate priority' }).click();
  await expect(page.getByText(/Priority: 80\/100/)).toBeVisible();
});


test('demo and hosted entry modes are explicit and independent', async ({ page }) => {
  await page.goto('/?mode=demo');
  await page.getByRole('link', { name: 'Connect Supabase', exact: true }).click();
  await expect(page).toHaveURL(/mode=app/);
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Demo environment')).toHaveCount(0);
  await page.getByRole('link', { name: 'Explore the local portfolio demo' }).click();
  await expect(page.getByLabel('Demo environment')).toBeVisible();
});
