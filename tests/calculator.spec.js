import { test, expect } from '@playwright/test';

test.describe('Calculator UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads without console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    await page.waitForLoadState('networkidle');
    expect(consoleErrors).toHaveLength(0);
  });

  test('display area is visible', async ({ page }) => {
    await expect(page.locator('.calculator-display')).toBeVisible();
    await expect(page.locator('#result')).toBeVisible();
  });

  test('all buttons render correctly', async ({ page }) => {
    // Check number buttons (0-9)
    for (let i = 0; i <= 9; i++) {
      await expect(page.locator(`[data-number="${i}"]`)).toBeVisible();
    }
    // Check decimal button
    await expect(page.locator('[data-number="decimal"]')).toBeVisible();
    // Check function buttons
    await expect(page.locator('[data-action="clear"]')).toBeVisible();
    await expect(page.locator('[data-action="negate"]')).toBeVisible();
    await expect(page.locator('[data-action="percent"]')).toBeVisible();
    // Check operator buttons
    await expect(page.locator('[data-operator="add"]')).toBeVisible();
    await expect(page.locator('[data-operator="subtract"]')).toBeVisible();
    await expect(page.locator('[data-operator="multiply"]')).toBeVisible();
    await expect(page.locator('[data-operator="divide"]')).toBeVisible();
    await expect(page.locator('[data-operator="equals"]')).toBeVisible();
  });

  test('button grid has 4 columns', async ({ page }) => {
    const rows = page.locator('.button-row');
    const rowCount = await rows.count();
    expect(rowCount).toBe(5);
  });

  test('zero button spans 2 columns', async ({ page }) => {
    const zeroButton = page.locator('.button.zero');
    await expect(zeroButton).toHaveClass(/zero/);
  });
});

test.describe('Calculator Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds two numbers correctly', async ({ page }) => {
    await page.click('[data-number="2"]');
    await page.click('[data-operator="add"]');
    await page.click('[data-number="3"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('5');
  });

  test('subtracts two numbers correctly', async ({ page }) => {
    await page.click('[data-number="5"]');
    await page.click('[data-operator="subtract"]');
    await page.click('[data-number="2"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('3');
  });

  test('multiplies two numbers correctly', async ({ page }) => {
    await page.click('[data-number="4"]');
    await page.click('[data-operator="multiply"]');
    await page.click('[data-number="3"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('12');
  });

  test('divides two numbers correctly', async ({ page }) => {
    await page.click('[data-number="8"]');
    await page.click('[data-operator="divide"]');
    await page.click('[data-number="2"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('4');
  });

  test('handles decimal operations (0.1 + 0.2)', async ({ page }) => {
    await page.click('[data-number="0"]');
    await page.click('[data-number="decimal"]');
    await page.click('[data-number="1"]');
    await page.click('[data-operator="add"]');
    await page.click('[data-number="0"]');
    await page.click('[data-number="decimal"]');
    await page.click('[data-number="2"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('0.3');
  });

  test('calculates percentage (50 + 25%)', async ({ page }) => {
    await page.click('[data-number="5"]');
    await page.click('[data-number="0"]');
    await page.click('[data-operator="add"]');
    await page.click('[data-number="2"]');
    await page.click('[data-number="5"]');
    await page.click('[data-action="percent"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('62.5');
  });

  test('negates a number (5 +/− = −5)', async ({ page }) => {
    await page.click('[data-number="5"]');
    await page.click('[data-action="negate"]');
    await expect(page.locator('#result')).toHaveText('-5');
  });

  test('clears all state (AC)', async ({ page }) => {
    await page.click('[data-number="5"]');
    await page.click('[data-operator="add"]');
    await page.click('[data-number="3"]');
    await page.click('[data-action="clear"]');
    await expect(page.locator('#result')).toHaveText('0');
    await expect(page.locator('#calculation')).toHaveText('');
  });

  test('handles large numbers (999999999 + 1)', async ({ page }) => {
    for (let i = 0; i < 9; i++) {
      await page.click('[data-number="9"]');
    }
    await page.click('[data-operator="add"]');
    await page.click('[data-number="1"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('1,000,000,000');
  });

  test('handles division by zero', async ({ page }) => {
    await page.click('[data-number="5"]');
    await page.click('[data-operator="divide"]');
    await page.click('[data-number="0"]');
    await page.click('[data-operator="equals"]');
    await expect(page.locator('#result')).toHaveText('Error');
  });
});

test.describe('Keyboard Input', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('number keys (0-9) work', async ({ page }) => {
    await page.keyboard.press('5');
    await expect(page.locator('#result')).toHaveText('5');
  });

  test('decimal point key works', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('.');
    await page.keyboard.press('3');
    await expect(page.locator('#result')).toHaveText('5.3');
  });

  test('addition key (+) works', async ({ page }) => {
    await page.keyboard.press('2');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('5');
  });

  test('subtraction key (-) works', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('-');
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('3');
  });

  test('multiplication key (*) works', async ({ page }) => {
    await page.keyboard.press('4');
    await page.keyboard.press('*');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('12');
  });

  test('division key (/) works', async ({ page }) => {
    await page.keyboard.press('8');
    await page.keyboard.press('/');
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('4');
  });

  test('Enter key for calculation', async ({ page }) => {
    await page.keyboard.press('2');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#result')).toHaveText('5');
  });

  test('Escape key for clear', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('Escape');
    await expect(page.locator('#result')).toHaveText('0');
  });

  test('Backspace for delete last digit', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('6');
    await page.keyboard.press('Backspace');
    await expect(page.locator('#result')).toHaveText('5');
  });

  test('% key for percentage', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('%');
    await expect(page.locator('#result')).toHaveText('0.05');
  });
});

test.describe('Responsive Design', () => {
  test('mobile viewport (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.calculator')).toBeVisible();
  });

  test('tablet viewport (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('.calculator')).toBeVisible();
  });

  test('desktop viewport (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await expect(page.locator('.calculator')).toBeVisible();
  });
});
