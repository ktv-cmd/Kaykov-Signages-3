import path from "path";
import { Page } from "@playwright/test";

export const BASE_URL = "http://localhost:3000";

export async function gotoRoute(page: Page, route: string) {
  await page.goto(route);
  // Wait for React to hydrate (Next.js SSR shell → client takeover)
  await page.waitForSelector("body");
  // Small settle for React Router to mount
  await page.waitForTimeout(300);
}

export async function waitForAppReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(300);
}

export function fixturePngPath() {
  return path.join(__dirname, "../fixtures/storefront.png");
}

export async function mockGenerateApi(page: Page) {
  await page.route("**/api/generate", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        jobId: "test-job-123",
        candidates: [
          {
            id: "candidate-1",
            variantIndex: 0,
            imageUrl: "https://picsum.photos/seed/sign1/400/400",
            spec: {
              depthProfile: "flat",
              edgeProfile: "sharp",
              mountingStyle: "flush",
              hasBackingPlate: false,
              materialFeel: "acrylic",
              lightingMode: "front",
              prompt: "test sign",
            },
            generatedAt: new Date().toISOString(),
          },
        ],
        compatibility: { allowedLightModes: ["front"] },
      }),
    });
  });
}

export async function mockLeadsApi(page: Page) {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ id: "test-lead-123" }),
    });
  });
}

export async function mockDetectDoorApi(page: Page, hasDoor = true) {
  await page.route("**/api/detect-door", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ hasDoor }),
    });
  });
}
