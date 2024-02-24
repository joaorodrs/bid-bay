import { test, expect } from "@playwright/test";

test("should render login form", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByLabel("E-mail")).toBeVisible();
  await expect(page.getByLabel("Senha")).toBeVisible();
  await expect(page.getByText("Entrar")).toBeVisible();
});

test("should validate login form values", async ({ page, context }) => {
  await page.goto("/login");

  const emailInput = page.getByLabel("E-mail");
  const passwordInput = page.getByLabel("Senha");
  const submitButton = page.getByText("Entrar");

  await submitButton.click();

  await expect(emailInput).toHaveAttribute("aria-invalid", "true");
  await expect(passwordInput).toHaveAttribute("aria-invalid", "true");

  await emailInput.fill("test123");
  await passwordInput.fill("test123");
  await submitButton.click();

  await expect(emailInput).toHaveAttribute("aria-invalid", undefined);
  await expect(passwordInput).toHaveAttribute("aria-invalid", undefined);

  await emailInput.focus();
  await emailInput.fill("test@test.com");
  await submitButton.click();

  await expect(emailInput).toHaveAttribute("aria-invalid", undefined);

  await context.clearCookies();
});

test("should set cookies after successfully loggin in", async ({
  page,
  context,
}) => {
  await page.goto("/login");

  const emailInput = page.getByLabel("E-mail");
  const passwordInput = page.getByLabel("Senha");
  const submitButton = page.getByText("Entrar");

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill("test@test.com");
  await passwordInput.fill("teste123");
  await submitButton.click();

  await page.waitForURL("/");

  const cookies = await context.cookies();

  expect(
    cookies.find((cookie) => cookie.name === "currentUser")?.value,
  ).toBeDefined();

  await context.clearCookies();
});
