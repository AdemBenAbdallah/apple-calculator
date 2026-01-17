# Apple-Style Calculator Project

## Overview

Create a web-based calculator with the same design and functionality as the Apple Calculator app. The calculator should use the existing Calculator class logic while providing a beautiful, responsive UI.

## Tasks

### Task 1: Create HTML Structure

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

### Task 2: Create CSS Styling

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

### Task 3: Create JavaScript UI Logic

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

### Task 4: Test the Implementation

Manual testing of all features:

**Test Cases:**

- Basic operations: 2+3=5, 5-2=3, 3×4=12, 10÷2=5
- Chain operations: 2+3+=
- Decimal operations: 0.1+0.2=0.3
- Percentage: 50+25%=62.5
- Negation: 5+/−=−5
- Clear: AC clears all state
- Large numbers: 999999999+1
- Division by zero: 5÷0 shows error
- Rapid button presses
- Keyboard input

**Acceptance Criteria:**

- [ ] All calculator functions work correctly
- [ ] UI responsive and buttons accurate
- [ ] No console errors in browser
- [ ] Works on mobile devices (touch events)
- [ ] All test cases pass

### Task 5: Final Verification

- Verify all files in correct locations
- Test in browser (Chrome, Safari, Firefox)
- Check console for errors
- Verify responsive design on mobile
- Ensure Calculator class methods are used correctly

**Acceptance Criteria:**

- [ ] Calculator opens in browser with no errors
- [ ] All 4 basic operations work
- [ ] Display shows correct values
- [ ] Buttons respond to clicks and keyboard
- [ ] Design matches Apple Calculator style

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
