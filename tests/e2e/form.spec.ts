import { test, expect } from "@playwright/test";
import { gotoRoute, mockLeadsApi } from "./helpers";

test.describe("Quote form page", () => {
  test.beforeEach(async ({ page }) => {
    await mockLeadsApi(page);
    await gotoRoute(page, "/form");
    // /form opens as a dialog overlay on top of the home page
    await expect(page.locator('[role="dialog"]')).toBeVisible({ timeout: 8000 });
  });

  test("renders form heading inside dialog", async ({ page }) => {
    await expect(
      page.locator('[role="dialog"] h2', { hasText: /custom quote/i }).first()
    ).toBeVisible();
  });

  test("name field is present inside dialog", async ({ page }) => {
    await expect(
      page.locator('[role="dialog"] input[placeholder="Your full name"]')
    ).toBeVisible();
  });

  test("Next Step button is disabled when name is empty", async ({ page }) => {
    const dialog = page.locator('[role="dialog"]');
    // Step 1 "Next Step" button is disabled when name/contact fields are empty
    const nextBtn = dialog.locator("button", { hasText: "Next Step" });
    await expect(nextBtn).toBeDisabled();
  });

  test("can fill in name field", async ({ page }) => {
    const nameInput = page.locator(
      '[role="dialog"] input[placeholder="Your full name"]'
    );
    await nameInput.fill("Test Business");
    await expect(nameInput).toHaveValue("Test Business");
  });
});
