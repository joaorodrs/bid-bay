import { test, expect } from "@playwright/test";

test("should redirect to /login if not authenticated", async ({ page }) => {
  await page.goto("/");

  await page.waitForURL("/login");

  await expect(page).toHaveURL("/login");
});
