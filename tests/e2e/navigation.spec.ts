import { test, expect } from "@playwright/test";
import { gotoRoute } from "./helpers";

test.describe("Route navigation", () => {
  test("/outdoor-signages loads with video showcase heading", async ({ page }) => {
    await gotoRoute(page, "/outdoor-signages");
    await expect(page.locator("h2", { hasText: "Video Showcase" }).first()).toBeVisible();
  });

  test("/indoor-signages loads", async ({ page }) => {
    await gotoRoute(page, "/indoor-signages");
    // Desktop h1 is in `hidden sm:flex` section (nth 1)
    await expect(page.locator("h1").nth(1)).toBeVisible();
  });

  test("/window redirects to /inst", async ({ page }) => {
    await gotoRoute(page, "/window");
    await page.waitForTimeout(500);
    expect(page.url()).toContain("/inst");
  });

  test("back navigation from outdoor to home", async ({ page }) => {
    await gotoRoute(page, "/");
    await gotoRoute(page, "/outdoor-signages");
    await page.goBack();
    await page.waitForTimeout(300);
    expect(page.url()).toMatch(/localhost:3000\/?$/);
  });

  test("/inst page loads", async ({ page }) => {
    await gotoRoute(page, "/inst");
    await expect(page.locator("body")).toBeVisible();
  });
});
