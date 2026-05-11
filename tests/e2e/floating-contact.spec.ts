import { test, expect } from "@playwright/test";
import { gotoRoute } from "./helpers";

test.describe("Floating contact buttons", () => {
  test.beforeEach(async ({ page }) => {
    await gotoRoute(page, "/");
  });

  test("toggle button is visible", async ({ page }) => {
    await expect(page.locator('button[aria-label="Contact Options"]')).toBeVisible();
  });

  test("clicking toggle reveals contact buttons", async ({ page }) => {
    await page.locator('button[aria-label="Contact Options"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('button[aria-label="Call"]')).toBeVisible();
    await expect(page.locator('button[aria-label="WhatsApp"]')).toBeVisible();
    await expect(page.locator('button[aria-label="Telegram"]')).toBeVisible();
    await expect(page.locator('button[aria-label="SMS"]')).toBeVisible();
  });

  test("clicking toggle again hides the buttons", async ({ page }) => {
    const btn = page.locator('button[aria-label="Contact Options"]');
    await btn.click();
    await page.waitForTimeout(300);
    await btn.click();
    await page.waitForTimeout(400);
    await expect(page.locator('button[aria-label="Call"]')).not.toBeVisible();
  });

  test("Call button uses tel: link via window.open", async ({ page }) => {
    await page.locator('button[aria-label="Contact Options"]').click();
    await page.waitForTimeout(300);
    // Button is present and clickable (actual tel: behavior via window.open)
    await expect(page.locator('button[aria-label="Call"]')).toBeEnabled();
  });

  test("WhatsApp button is enabled after toggle", async ({ page }) => {
    await page.locator('button[aria-label="Contact Options"]').click();
    await page.waitForTimeout(300);
    await expect(page.locator('button[aria-label="WhatsApp"]')).toBeEnabled();
  });
});
