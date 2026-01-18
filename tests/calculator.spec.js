import { test, expect } from '@playwright/test';

test('calculator page loads successfully', async ({ page }) => {
  // Navigate to the calculator page
  await page.goto('/');

  // Check that the page loads without errors
  await expect(page).toHaveTitle(/Apple Calculator/);

  // Check that the calculator display is visible
  const display = page.locator('.calculator-display');
  await expect(display).toBeVisible();

  // Check that all calculator buttons are present
  const buttons = page.locator('.calculator-button');
  await expect(buttons).toHaveCount(19); // AC, +/-, %, ÷, 7, 8, 9, ×, 4, 5, 6, -, 1, 2, 3, +, 0, ., =

  // Check for console errors
  page.on('console', message => {
    if (message.type() === 'error') {
      console.log('Console error:', message.text());
    }
  });

  // Wait a moment to catch any immediate console errors
  await page.waitForTimeout(1000);
});

test('calculator has proper structure', async ({ page }) => {
  await page.goto('/');

  // Check that the main calculator container exists
  const calculator = page.locator('.calculator');
  await expect(calculator).toBeVisible();

  // Check display area
  const displayArea = page.locator('.display-area');
  await expect(displayArea).toBeVisible();

  // Check button grid
  const buttonGrid = page.locator('.button-grid');
  await expect(buttonGrid).toBeVisible();

  // Verify specific buttons exist
  const acButton = page.locator('button[data-value="AC"]');
  await expect(acButton).toBeVisible();

  const zeroButton = page.locator('button[data-value="0"]');
  await expect(zeroButton).toBeVisible();

  const equalsButton = page.locator('button[data-value="="]');
  await expect(equalsButton).toBeVisible();
});