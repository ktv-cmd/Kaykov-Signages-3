import { test, expect } from "@playwright/test";
import { gotoRoute, mockDetectDoorApi, fixturePngPath } from "./helpers";

test.describe("AI tool — Step 1 Upload", () => {
  test.beforeEach(async ({ page }) => {
    await mockDetectDoorApi(page);
    await gotoRoute(page, "/ai");
  });

  test("renders upload step heading", async ({ page }) => {
    await expect(
      page.locator("h2", { hasText: "Upload your storefront" })
    ).toBeVisible();
  });

  test("business name input is present", async ({ page }) => {
    await expect(
      page.locator('input[placeholder="Enter your business name"]')
    ).toBeVisible();
  });

  test("Continue to Placement is disabled initially", async ({ page }) => {
    const continueBtn = page.locator("button", { hasText: "Continue to Placement" });
    await expect(continueBtn).toBeDisabled();
  });

  test("upload storefront, enter name, select style → continue enabled", async ({ page }) => {
    // Upload via setInputFiles directly on the hidden file input
    await page.locator("input[type='file']").first().setInputFiles(fixturePngPath());
    // Wait for storefront preview image to render
    await expect(page.locator('img[alt="Storefront"]')).toBeVisible({ timeout: 5000 });

    // Enter business name
    await page.locator('input[placeholder="Enter your business name"]').fill("Test Signs Co");

    // Select the first reference style card (aria-pressed button)
    await page.locator("button[aria-pressed]").first().click();

    // Continue button should become enabled
    await expect(
      page.locator("button", { hasText: "Continue to Placement" })
    ).toBeEnabled({ timeout: 8000 });
  });

  test("proceed to placement step after upload", async ({ page }) => {
    await page.locator("input[type='file']").first().setInputFiles(fixturePngPath());
    await expect(page.locator('img[alt="Storefront"]')).toBeVisible({ timeout: 5000 });

    await page.locator('input[placeholder="Enter your business name"]').fill("Test Signs Co");
    await page.locator("button[aria-pressed]").first().click();

    const continueBtn = page.locator("button", { hasText: "Continue to Placement" });
    await expect(continueBtn).toBeEnabled({ timeout: 8000 });
    await continueBtn.click();

    await expect(
      page.locator("h2", { hasText: "Mark where the sign goes" })
    ).toBeVisible({ timeout: 5000 });
  });
});
