import { test, expect } from '@playwright/test';

// spec: specs/instructions-search.md

test.describe('Search instructions by brand and model', () => {
  test('searches instructions for BMW X5', async ({ page }) => {
    // 1. Open the QAuto start page.
    await page.goto('/');

    // 2. Click Guest log in.
    await page.getByRole('button', { name: 'Guest log in' }).click();

    // 3. Open the Instructions section.
    await page.getByRole('link', { name: 'Instructions', exact: true }).click();

    // 4. Select BMW in the Brand control.
    await page.getByRole('button', { name: 'Audi' }).click();
    await page.getByText('BMW', { exact: true }).click();

    // 5. Select X5 in the Model control.
    await page.getByRole('button', { name: '3' }).click();
    await page.getByText('X5', { exact: true }).click();

    // 6. Click Search.
    await page.getByRole('button', { name: 'Search' }).click();

    // 7. Wait for the search results to be rendered without a fixed wait.
    const instructionCards = page.getByRole('listitem');
    await expect(instructionCards).not.toHaveCount(0);

    // 8. Verify that at least one instruction card is displayed.
    await expect(instructionCards.first()).toBeVisible();

    // 9. Verify that every displayed card is for BMW X5.
    for (const card of await instructionCards.all()) {
      await expect(card).toContainText('BMW X5');

      // 10. Verify that every displayed card has a Download link.
      await expect(card.getByRole('link', { name: 'Download', exact: true })).toBeVisible();
    }
  });
});
