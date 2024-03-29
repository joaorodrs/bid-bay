import { test, expect } from "@playwright/test";

test("should redirect to /auth/login if not authenticated", async ({
  page,
}) => {
  await page.goto("/");

  await page.waitForLoadState();

  await expect(page).toHaveURL("/auth/login");
});
