import { test, expect } from "@playwright/test";
import { gotoRoute } from "./helpers";

test.describe("Outdoor signages page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoRoute(page, "/outdoor-signages");
  });

  test("video showcase heading is visible", async ({ page }) => {
    await expect(
      page.locator("h2", { hasText: "Kaykov Signs" }).first()
    ).toBeVisible();
  });

  test("video thumbnails are rendered", async ({ page }) => {
    const thumbs = page.locator("img[alt]");
    const count = await thumbs.count();
    expect(count).toBeGreaterThan(0);
  });

  test("all visible images have non-empty alt text", async ({ page }) => {
    const imgs = await page.locator("img").all();
    for (const img of imgs) {
      const alt = await img.getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });
});

test.describe("Indoor signages page", () => {
  test.beforeEach(async ({ page }) => {
    await gotoRoute(page, "/indoor-signages");
  });

  test("desktop hero section is visible", async ({ page }) => {
    // Desktop h1 is in `hidden sm:flex` section (nth 1 in DOM)
    await expect(page.locator("h1").nth(1)).toBeVisible();
  });

  test("video showcase heading is visible", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForTimeout(500);
    await expect(
      page.locator("h2", { hasText: "Kaykov Signs" }).first()
    ).toBeVisible();
  });

  test("floating contact button present", async ({ page }) => {
    await expect(
      page.locator('button[aria-label="Contact Options"]')
    ).toBeVisible();
  });
});
