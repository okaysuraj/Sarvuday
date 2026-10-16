import { test, expect } from '@playwright/test';

// Exercise real page code, including unavailable-network states. No fabricated API responses.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.protocol.startsWith('http') && url.origin !== 'http://127.0.0.1:4173') return route.abort();
    return route.continue();
  });
});

for (const width of [390, 1440]) {
  for (const path of ['/', '/login', '/register', '/forgot-password', '/about', '/contact', '/privacy', '/terms', '/emergency', '/disorders', '/approved-counsellors', '/assessments']) {
    test(`${path} renders at ${width}px without a page crash or horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(path);
      await expect(page.locator('main, section, form').filter({ visible: true }).first()).toBeVisible();
      await expect(page.getByRole('heading', { name: 'This page could not load' })).toHaveCount(0);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

for (const path of ['/profile', '/chat', '/goals', '/wallet', '/settings', '/counsellor-dashboard', '/admin-dashboard']) {
  test(`${path} requires authentication`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login$/);
  });
}

test('changing the stored role alone does not grant admin access', async ({ page }) => {
  await page.goto('/login');
  await page.evaluate(() => localStorage.setItem('userType', 'admin'));
  await page.goto('/admin-dashboard');
  await expect(page).toHaveURL(/\/login$/);
});

test('urgent support stays available while signed out and never claims dispatch', async ({ page }) => {
  await page.goto('/emergency');
  await expect(page.getByRole('heading', { name: 'Urgent support' })).toBeVisible();
  await expect(page.getByText('This app does not dispatch emergency assistance or automatically share your location.')).toBeVisible();
});
