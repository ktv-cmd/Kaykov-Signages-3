import { test, expect, Page } from "@playwright/test";
import { gotoRoute, mockDetectDoorApi, fixturePngPath } from "./helpers";

async function uploadAndReachPlacement(page: Page) {
  await mockDetectDoorApi(page);
  await gotoRoute(page, "/ai");

  // Step 1 — Upload
  await page.locator("input[type='file']").first().setInputFiles(fixturePngPath());
  // Wait for the storefront preview to appear (confirms the file was accepted + URL created)
  await expect(page.locator('img[alt="Storefront"]')).toBeVisible({ timeout: 5000 });

  await page.locator('input[placeholder="Enter your business name"]').fill("Test Signs Co");
  await page.locator("button[aria-pressed]").first().click();

  const continueBtn = page.locator("button", { hasText: "Continue to Placement" });
  await expect(continueBtn).toBeEnabled({ timeout: 8000 });
  await continueBtn.click();

  await expect(
    page.locator("h2", { hasText: "Mark where the sign goes" })
  ).toBeVisible({ timeout: 5000 });

  // Wait for canvas to have a rendered size ≥ 2px (requires natural image dimensions)
  const canvas = page.locator("canvas").first();
  await canvas.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const c = document.querySelector("canvas");
    if (!c) return false;
    const r = c.getBoundingClientRect();
    return r.width >= 2 && r.height >= 2;
  }, { timeout: 5000 });
}

async function drawStrokeOnCanvas(page: Page) {
  const canvas = page.locator("canvas").first();
  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas bounding box not found");
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx - 20, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 20, cy, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(200);
}

test.describe("AI tool — Step 2 Placement", () => {
  test("renders placement heading", async ({ page }) => {
    await uploadAndReachPlacement(page);
    await expect(
      page.locator("h2", { hasText: "Mark where the sign goes" })
    ).toBeVisible();
  });

  test("Confirm placement button is disabled without painting", async ({ page }) => {
    await uploadAndReachPlacement(page);
    await expect(page.locator("button", { hasText: "Confirm placement" })).toBeDisabled();
  });

  test("drawing on canvas enables Confirm placement", async ({ page }) => {
    await uploadAndReachPlacement(page);
    await drawStrokeOnCanvas(page);
    await expect(
      page.locator("button", { hasText: "Confirm placement" })
    ).toBeEnabled({ timeout: 3000 });
  });

  test("confirming placement advances to variations step", async ({ page }) => {
    await uploadAndReachPlacement(page);
    await drawStrokeOnCanvas(page);
    await expect(
      page.locator("button", { hasText: "Confirm placement" })
    ).toBeEnabled({ timeout: 3000 });
    await page.locator("button", { hasText: "Confirm placement" }).click();
    await expect(
      page.locator("h2", { hasText: "How many design options?" })
    ).toBeVisible({ timeout: 5000 });
  });
});
