# Apple-Style Calculator Project

## Overview

Create a web-based calculator with the same design and functionality as the Apple Calculator app. The calculator should use the existing Calculator class logic while providing a beautiful, responsive UI.

## Tasks

### Task 1: Setup Playwright Testing Infrastructure

Set up Playwright for automated testing of the calculator.

**Requirements:**

- Initialize npm project with `package.json`
- Install Playwright and configure test environment
- Create `playwright.config.js` with proper settings
- Install chromium browser for testing
- Create test directory structure

**Step-by-Step:**

- [ ] Run `npm init -y` to create `package.json`
- [ ] Run `npm install --save-dev @playwright/test` to install Playwright
- [ ] Run `npx playwright install chromium` to install browser
- [ ] Create `playwright.config.js` with:
  - Test directory: `tests/`
  - Reporter: `html` for local, `list` for CI
  - Base URL pointing to the calculator page
  - Timeout: 30000ms
  - Mobile and desktop viewport presets
- [ ] Create `tests/` directory
- [ ] Create initial test file `tests/calculator.spec.js` with smoke test

**Acceptance Criteria:**

- [ ] `package.json` created with Playwright as dev dependency
- [ ] `playwright.config.js` exists and is configured
- [ ] Chromium browser installed
- [ ] `tests/` directory created
- [ ] Initial smoke test passes (page loads without errors)

**Test Verification:**

After completing this task, run the tests to verify Playwright is working:

```bash
npm test
```

Expected result: All tests pass with no console errors.

**Acceptance Criteria:**

- [ ] All setup steps completed
- [ ] Playwright smoke test passes
- [ ] `npm test` runs successfully

---

### Task 2: Create HTML Structure

Create `index.html` with:

- Calculator display area showing current calculation and result
- Button grid matching Apple Calculator layout:
  - Numbers (0-9)
  - Operations (+, -, ×, ÷)
  - Special buttons (AC, +/-, %, =)
  - Decimal point (.)
- Proper semantic HTML structure
- Meta tags for mobile responsiveness
- Links to CSS and JavaScript files

**Acceptance Criteria:**

- [ ] HTML file created at project root
- [ ] Calculator display area present
- [ ] All button types included (AC, +/-, %, ÷, ×, -, +, ., =, 0-9)
- [ ] Proper semantic structure with buttons and display
- [ ] Mobile-responsive viewport meta tag
- [ ] Linked to styles/main.css and src/main.js

**Test Verification:**

After completing this task, run the tests to verify HTML structure:

```bash
npm test
```

Tests verify:

- Page loads successfully
- Display area is visible
- All buttons render correctly
- No console errors

Expected result: All UI rendering tests pass.

---

### Task 3: Create CSS Styling

Create `styles/main.css` with Apple Calculator aesthetics:

**Design Requirements:**

- Dark mode theme (Apple default)
- Round buttons with proper spacing
- Button grid layout (4 columns)
- Display styling (right-aligned, large font for result)
- Button states (default, active, disabled)
- Smooth animations and transitions
- Orange accent color (#FF9F0A) for operators
- Light gray (#A5A5A5) for top row (AC, +/-, %)
- Dark gray (#333333) for numbers
- Background (#000000)

**Button Layout:**

```
+───────┬───────┬───────┬───────┐
│   AC  │  +/-  │   %   │   ÷   │
├───────┼───────┼───────┼───────┤
│   7   │   8   │   9   │   ×   │
├───────┼───────┼───────┼───────┤
│   4   │   5   │   6   │   -   │
├───────┼───────┼───────┼───────┤
│   1   │   2   │   3   │   +   │
├───────┼───────┼───────┼───────┤
│   0   │   .   │   =   │       │  (0 spans 2 columns)
└───────┴───────┴───────┴───────┘
```

**Acceptance Criteria:**

- [ ] styles directory created
- [ ] main.css file created with Apple-like design
- [ ] Dark theme implemented
- [ ] Button grid matches layout above
- [ ] Colors match Apple Calculator (orange operators, gray numbers)
- [ ] Responsive design works on mobile
- [ ] Smooth animations and transitions on button presses

**Test Verification:**

After completing this task, run the tests to verify CSS styling:

```bash
npm test
```

Tests verify:

- Button grid layout with 4 columns
- Button colors match Apple design
- Zero button spans 2 columns
- Responsive design on different viewports
- No console errors

Expected result: All styling tests pass.

---

### Task 4: Create JavaScript UI Logic

Create `src/main.js` for UI interaction:

**Requirements:**

- Import or use the existing Calculator class from calculator.ts
- Handle button clicks:
  - Numbers (0-9): append to display
  - Operators (+, -, ×, ÷): store for calculation
  - AC: clear all state
  - +/−: negate current value
  - %: convert to percentage (divide by 100)
  - =: calculate result
  - .: add decimal point (one per number)
- Display management:
  - Show current input
  - Show calculation formula
  - Format large numbers with commas
  - Limit decimal places
- Error handling:
  - Division by zero
  - Invalid operations
- Keyboard support:
  - Number keys (0-9)
  - Operators (+, -, \*, /)
  - Enter/= for calculation
  - Escape for AC
  - Backspace for delete last digit
  - . for decimal

**Acceptance Criteria:**

- [ ] src/main.js created
- [ ] All buttons functional and connected to Calculator class
- [ ] Calculator operations work correctly (add, subtract, multiply, divide)
- [ ] Display updates properly with current input
- [ ] Chain calculations work (e.g., 2 + 3 + = → 5)
- [ ] Error handling for division by zero
- [ ] Keyboard shortcuts work

**Test Verification:**

After completing this task, run the full test suite to verify all functionality:

```bash
npm test
```

Tests verify:

- All calculator operations (add, subtract, multiply, divide)
- Decimal operations (0.1 + 0.2 = 0.3)
- Percentage calculations (50 + 25% = 62.5)
- Negation (5 +/− = −5)
- Clear functionality (AC)
- Large numbers (999999999 + 1)
- Division by zero error handling
- Keyboard input (0-9, +, -, \*, /, Enter, Escape, Backspace)
- Responsive design on mobile, tablet, desktop

Expected result: All functional tests pass (100% pass rate).

---

### Task 5: Run Automated Tests

Run the full Playwright test suite to verify all calculator functionality.

**Requirements:**

- Execute all UI rendering tests
- Execute all functional calculator tests
- Execute all keyboard input tests
- Execute all responsive design tests
- Verify no console errors
- Generate test report

**Test Suite Coverage:**

- UI rendering tests (buttons, display, layout)
- Functional tests (add, subtract, multiply, divide)
- Edge case tests (division by zero, decimals, large numbers)
- Keyboard input tests
- Mobile responsive tests

**Test Verification:**

After completing this task, run the full test suite:

```bash
npm test
```

Tests verify:

- All calculator operations (add, subtract, multiply, divide)
- Decimal operations (0.1 + 0.2 = 0.3)
- Percentage calculations (50 + 25% = 62.5)
- Negation (5 +/− = −5)
- Clear functionality (AC)
- Large numbers (999999999 + 1)
- Division by zero error handling
- Keyboard input (0-9, +, -, \*, /, Enter, Escape, Backspace)
- Responsive design on mobile, tablet, desktop
- No console errors in browser

**Acceptance Criteria:**

- [ ] All UI rendering tests pass
- [ ] All functional calculator tests pass
- [ ] All keyboard input tests pass
- [ ] All responsive design tests pass
- [ ] No console errors in browser
- [ ] HTML test report generated
- [ ] All tests pass with 100% success rate

---

### Task 6: Final Verification

Final verification of all calculator functionality.

**Requirements:**

- Verify all files in correct locations
- Test in browser (Chrome, Safari, Firefox)
- Run full Playwright test suite
- Check console for errors
- Verify responsive design on mobile
- Ensure Calculator class methods are used correctly

**Test Verification:**

After completing this task, run the final test suite:

```bash
npm test
```

Expected result: All tests pass with 100% success rate. HTML report generated at `playwright-report/index.html`.

**Acceptance Criteria:**

- [ ] Calculator opens in browser with no errors
- [ ] All 4 basic operations work
- [ ] Display shows correct values
- [ ] Buttons respond to clicks and keyboard
- [ ] Design matches Apple Calculator style
- [ ] All Playwright tests pass
- [ ] No console errors
- [ ] HTML test report available

## Stop Condition

When all acceptance criteria above are checked (passes: true), output: `<promise>COMPLETE</promise>`

## Notes

- Keep implementations simple and focused
- Use the existing Calculator class from src/calculator.ts
- Test frequently during development
- Match Apple design as closely as possible
- Handle edge cases gracefully
- Update progress.txt after each task

## Bonus (Optional)

If time permits, add:

- [ ] Hover effects on desktop
- [ ] Sound effects (optional)
- [ ] Memory functions (M+, M-, MR, MC)
