import { test, expect } from "@playwright/test";

test("Användare kan logga in och see produkter", async ({ page }) => {
    const username = process.env.E2E_USERNAME;
    const password = process.env.E2E_PASSWORD;

    if (!username || !password) {
        throw new Error(
            "E2E_USERNAME and E2E_PASSWORD must be set.",
        );
    }

    await page.goto("/login");

    await page.getByLabel("Username").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: /login/i }).click();

    await expect(page).toHaveURL("/welcome");

    await page.goto("/products");

    await expect(
        page.getByRole("heading", { name: "Products" }),
    ).toBeVisible();

    const productCards = page.locator("article");
    await expect(productCards.first()).toBeVisible();
});