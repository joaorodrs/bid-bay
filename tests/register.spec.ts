import { db } from "@/lib/database";
import { test, expect } from "@playwright/test";

const newUserName = "Test User";
const newUserEmail = "test@test.com";
const newUserPassword = "test123";

test.describe("register", () => {
  test("should render register form", async ({ page }) => {
    await page.goto("/auth/register");

    await expect(page.getByLabel("name")).toBeVisible();
    await expect(page.getByLabel("e-mail")).toBeVisible();
    await expect(page.getByLabel("confirm your password")).toBeVisible();
    await expect(page.getByText("sign up")).toBeVisible();
  });

  test("should validate register form empty values", async ({ page }) => {
    await page.goto("/auth/register");

    const name = page.getByLabel("name");
    const email = page.getByLabel("e-mail");
    const password = page.getByTestId("password-field");
    const confirmPassword = page.getByLabel("confirm your password");
    const registerBtn = page.getByText("sign up");

    await registerBtn.click();

    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(password).toHaveAttribute("aria-invalid", "true");
    await expect(confirmPassword).toHaveAttribute("aria-invalid", "true");
  });

  test("should submit correctly register form values", async ({ page }) => {
    await page.goto("/auth/register");

    const name = page.getByLabel("name");
    const email = page.getByLabel("e-mail");
    const password = page.getByTestId("password-field");
    const confirmPassword = page.getByLabel("confirm your password");
    const registerBtn = page.getByText("sign up");

    await name.fill(newUserName);
    await email.fill(newUserEmail);
    await password.fill(newUserPassword);
    await confirmPassword.fill(newUserPassword);
    await registerBtn.click();

    await page.waitForLoadState("networkidle");

    await page.waitForURL("/auth/login");

    const userCreated = await db.user.findFirst({
      select: {
        email: true,
        name: true,
      },
    });

    expect(userCreated?.name).toBe(newUserName);
    expect(userCreated?.email).toBe(newUserEmail);
  });
});
