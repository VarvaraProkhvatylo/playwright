import { test, expect } from '@playwright/test';

// spec: specs/add-car.md
// seed: tests/seed.spec.ts

test.describe('Guest adds a car to Garage', () => {
  test('guest adds Audi TT to Garage', async ({ page }) => {
    // 1. Open QAuto and log in as a guest.
    await page.goto('/');
    await page.getByRole('button', { name: 'Guest log in' }).click();

    // 2. Open the Add car form.
    await page.getByRole('button', { name: 'Add car' }).click();

    // 3. Select Audi as the brand.
    await page.getByRole('combobox', { name: 'Brand' }).selectOption({ label: 'Audi' });

    // 4. Select TT as the model.
    await page.getByRole('combobox', { name: 'Model' }).selectOption({ label: 'TT' });

    // 5. Enter mileage 12000.
    await page.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');

    // 6. Save the car.
    await page.getByRole('button', { name: 'Add' }).click();

    // 7. Verify the Garage URL and the visible Audi TT record.
    await expect(page).toHaveURL(/panel\/garage/);
    await expect(page.getByText('Audi TT', { exact: true })).toBeVisible();
  });
});
