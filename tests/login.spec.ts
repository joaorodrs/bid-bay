import { test, expect } from "@playwright/test";

import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/database";

const testName = "Test User";
const testMail = "test@test.com";
const testPassword = "test123";

test.describe("login", () => {
  test("should render login form", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page.getByLabel("e-mail")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByText("enter")).toBeVisible();
  });

  test("should validate login form values", async ({ page }) => {
    await page.goto("/auth/login");

    const emailInput = page.getByLabel("e-mail");
    const passwordInput = page.getByLabel("password");
    const submitButton = page.getByText("enter");

    await submitButton.click();

    await expect(emailInput).toHaveAttribute("aria-invalid", "true");
    await expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    await emailInput.fill("any@any.com");
    await passwordInput.fill("any123");
    await submitButton.click();

    await expect(emailInput).toHaveAttribute("aria-invalid", undefined);
    await expect(passwordInput).toHaveAttribute("aria-invalid", undefined);

    await emailInput.focus();
    await emailInput.fill("any@any.com");
    await submitButton.click();

    await expect(emailInput).toHaveAttribute("aria-invalid", undefined);
  });

  test("should set cookies after successfully loggin in", async ({
    page,
    context,
  }) => {
    await db.user.create({
      data: {
        name: testName,
        email: testMail,
        password: await hashPassword(testPassword),
      },
    });

    await db.$disconnect();

    await page.goto("/auth/login");

    const emailInput = page.getByLabel("e-mail");
    const passwordInput = page.getByLabel("password");
    const submitButton = page.getByText("enter");

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(testMail);
    await passwordInput.fill(testPassword);
    await submitButton.click();

    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");

    await expect(page).toHaveURL("/");

    const cookies = await context.cookies();

    expect(
      cookies.find((cookie) => cookie.name === "currentUser")?.value,
    ).toBeDefined();

    await db.$connect();

    await db.user.delete({
      where: {
        email: testMail,
      },
    });

    await db.$disconnect();
  });
});
