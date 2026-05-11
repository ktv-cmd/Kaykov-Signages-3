import { test, expect, Page } from "@playwright/test";
import {
  gotoRoute,
  mockDetectDoorApi,
  mockGenerateApi,
  mockLeadsApi,
  fixturePngPath,
} from "./helpers";

async function reachVariationsStep(page: Page) {
  await mockDetectDoorApi(page);
  await gotoRoute(page, "/ai");

  // Step 1 — Upload
  await page.locator("input[type='file']").first().setInputFiles(fixturePngPath());
  await expect(page.locator('img[alt="Storefront"]')).toBeVisible({ timeout: 5000 });
  await page.locator('input[placeholder="Enter your business name"]').fill("Test Signs Co");
  await page.locator("button[aria-pressed]").first().click();
  const continueBtn = page.locator("button", { hasText: "Continue to Placement" });
  await expect(continueBtn).toBeEnabled({ timeout: 8000 });
  await continueBtn.click();

  // Step 2 — Placement (draw a stroke)
  await expect(
    page.locator("h2", { hasText: "Mark where the sign goes" })
  ).toBeVisible({ timeout: 5000 });

  const canvas = page.locator("canvas").first();
  await canvas.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const c = document.querySelector("canvas");
    if (!c) return false;
    const r = c.getBoundingClientRect();
    return r.width >= 2 && r.height >= 2;
  }, { timeout: 5000 });

  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas not found");
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx - 20, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 20, cy, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(200);

  const confirmBtn = page.locator("button", { hasText: "Confirm placement" });
  await expect(confirmBtn).toBeEnabled({ timeout: 3000 });
  await confirmBtn.click();

  // Step 3 — Variations
  await expect(
    page.locator("h2", { hasText: "How many design options?" })
  ).toBeVisible({ timeout: 5000 });
}

async function reachGenerateStep(page: Page) {
  await reachVariationsStep(page);
  await page.locator("button", { hasText: "1 design" }).click();
  await page.locator("button", { hasText: "Continue" }).click();
  await expect(
    page.locator("h2", { hasText: "Ready to generate" })
  ).toBeVisible({ timeout: 5000 });
}

test.describe("AI tool — Step 3 Variations", () => {
  test("renders all three variation options", async ({ page }) => {
    await reachVariationsStep(page);
    await expect(page.locator("button", { hasText: "1 design" })).toBeVisible();
    await expect(page.locator("button", { hasText: "3 designs" })).toBeVisible();
    await expect(page.locator("button", { hasText: "6 designs" })).toBeVisible();
  });

  test("selecting 3 designs and continuing advances to generate step", async ({ page }) => {
    await reachVariationsStep(page);
    await page.locator("button", { hasText: "3 designs" }).click();
    await page.locator("button", { hasText: "Continue" }).click();
    await expect(
      page.locator("h2", { hasText: "Ready to generate" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("Continue button is always enabled (default variationCount=1)", async ({ page }) => {
    await reachVariationsStep(page);
    await expect(page.locator("button", { hasText: "Continue" })).toBeEnabled();
  });
});

test.describe("AI tool — Step 4 Generate", () => {
  test("renders generate step heading", async ({ page }) => {
    await reachGenerateStep(page);
    await expect(
      page.locator("h2", { hasText: "Ready to generate" })
    ).toBeVisible();
  });

  test("clicking Generate opens lead capture modal", async ({ page }) => {
    await reachGenerateStep(page);
    await page.locator("button", { hasText: /Generate My Sign/i }).click();
    await expect(
      page.locator("h2", { hasText: "Almost there" })
    ).toBeVisible({ timeout: 5000 });
  });

  test("lead modal shows validation error with name but no contact", async ({ page }) => {
    await reachGenerateStep(page);
    await page.locator("button", { hasText: /Generate My Sign/i }).click();
    await expect(page.locator("h2", { hasText: "Almost there" })).toBeVisible({ timeout: 5000 });
    // Fill name but leave email + phone empty — triggers custom validation
    await page.locator('input[placeholder="Jane Smith"]').fill("Test User");
    await page.locator("button", { hasText: "Confirm & Generate My Sign" }).click();
    await expect(
      page.locator("text=Name and either email or phone are required.")
    ).toBeVisible({ timeout: 3000 });
  });

  test("complete lead capture + generation shows results", async ({ page }) => {
    await mockLeadsApi(page);
    await mockGenerateApi(page);
    await reachGenerateStep(page);

    await page.locator("button", { hasText: /Generate My Sign/i }).click();
    await expect(page.locator("h2", { hasText: "Almost there" })).toBeVisible({ timeout: 5000 });

    await page.locator('input[placeholder="Jane Smith"]').fill("Test User");
    await page.locator('input[placeholder="jane@example.com"]').fill("test@example.com");
    await page.locator("button", { hasText: "Confirm & Generate My Sign" }).click();

    await expect(
      page.locator("h2", { hasText: "Your Generated Designs" })
    ).toBeVisible({ timeout: 15000 });
  });

  test("result step shows download button", async ({ page }) => {
    await mockLeadsApi(page);
    await mockGenerateApi(page);
    await reachGenerateStep(page);

    await page.locator("button", { hasText: /Generate My Sign/i }).click();
    await expect(page.locator("h2", { hasText: "Almost there" })).toBeVisible({ timeout: 5000 });
    await page.locator('input[placeholder="Jane Smith"]').fill("Test User");
    await page.locator('input[placeholder="jane@example.com"]').fill("test@example.com");
    await page.locator("button", { hasText: "Confirm & Generate My Sign" }).click();

    await expect(
      page.locator("h2", { hasText: "Your Generated Designs" })
    ).toBeVisible({ timeout: 15000 });
    await expect(
      page.locator("button", { hasText: /Download/i }).first()
    ).toBeVisible();
  });
});
