const { test, expect } = require('@playwright/test');

test('YouTube uzerinde hello world aramasi yap', async ({ page }) => {
  // 1. YouTube ana sayfasina git
  await page.goto('https://www.youtube.com', { waitUntil: 'domcontentloaded' });

  // 2. Eger bolgesel cerez onay ekrani cikarsa kabul et/reddet
  const rejectCookies = page.getByRole('button', { name: /Reject all|Accept all/i }).first();
  if (await rejectCookies.isVisible({ timeout: 3000 }).catch(() => false)) {
    await rejectCookies.click();
  }

  // 3. Arama cubugunu bul, "hello world" yaz ve Enter'a bas
  const searchInput = page.locator('input[name="search_query"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('hello world');
  await searchInput.press('Enter');

  // 4. URL'nin arama sonuclarina yonlendigini ve basligin degistigini dogrula
  await expect(page).toHaveURL(/results\?search_query=hello\+world/);
  await expect(page).toHaveTitle(/hello world - YouTube/i);
});
