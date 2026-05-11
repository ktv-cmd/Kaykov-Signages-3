import { test, expect } from "@playwright/test";
import { gotoRoute } from "./helpers";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoRoute(page, "/");
  });

  test("renders hero h1", async ({ page }) => {
    // Desktop section is `hidden sm:flex` — at 1280px the sm:flex h1 is visible (nth 1)
    const h1 = page.locator("h1").nth(1);
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Signs");
  });

  test("hero video is present", async ({ page }) => {
    await expect(page.locator("video").first()).toBeAttached();
  });

  test("floating contact button is visible", async ({ page }) => {
    await expect(
      page.locator('button[aria-label="Contact Options"]')
    ).toBeVisible();
  });

  test("Instagram video grid renders thumbnails", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForTimeout(500);
    // Look for any img that is actually visible in the viewport after scrolling
    const visibleImg = page.locator("img[alt]").filter({ visible: true }).first();
    await expect(visibleImg).toBeAttached({ timeout: 8000 });
  });

  test("CTA opens quote form", async ({ page }) => {
    // The desktop CTA button is inside the `hidden sm:flex` section
    const ctaBtn = page
      .locator("section.hidden.sm\\:flex button", { hasText: /quote/i })
      .first();
    await ctaBtn.click();
    // Expect the quote form dialog to appear
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 5000 });
  });
});
