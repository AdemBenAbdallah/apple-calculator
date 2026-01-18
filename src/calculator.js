// Basic Calculator class for Apple-style calculator
class Calculator {
  constructor() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operation = null;
    this.shouldResetDisplay = false;
  }

  // Clear all values
  clear() {
    this.currentValue = '0';
    this.previousValue = '';
    this.operation = null;
    this.shouldResetDisplay = false;
  }

  // Input a digit (alias for inputDigit to match test expectations)
  inputNumber(digit) {
    this.inputDigit(digit);
  }

  // Input a digit
  inputDigit(digit) {
    if (this.shouldResetDisplay) {
      this.currentValue = '';
      this.shouldResetDisplay = false;
    }

    if (this.currentValue === '0') {
      this.currentValue = digit;
    } else {
      this.currentValue += digit;
    }
  }

  // Input decimal point
  inputDecimal() {
    if (this.shouldResetDisplay) {
      this.currentValue = '0';
      this.shouldResetDisplay = false;
    }

    if (!this.currentValue.includes('.')) {
      this.currentValue += '.';
    }
  }

  // Choose operation (to match test expectations)
  chooseOperation(op) {
    // Convert string operations to symbols
    const operationMap = {
      'add': '+',
      'subtract': '-',
      'multiply': '*',
      'divide': '/'
    };
    
    const symbol = operationMap[op] || op;
    this.setOperation(symbol);
  }

  // Set operation
  setOperation(op) {
    if (this.operation !== null) {
      this.calculate();
    }

    this.previousValue = this.currentValue;
    this.operation = op;
    this.shouldResetDisplay = true;
  }

  // Calculate result
  calculate() {
    if (this.operation === null || this.previousValue === '') {
      return;
    }

    const prev = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    let result;

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          this.currentValue = 'Error';
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }

    this.currentValue = result.toString();
    this.operation = null;
    this.previousValue = '';
    this.shouldResetDisplay = true;
  }

  // Toggle sign (alias for negate to match test expectations)
  negate() {
    this.toggleSign();
  }

  // Toggle sign
  toggleSign() {
    if (this.currentValue !== '0') {
      if (this.currentValue.startsWith('-')) {
        this.currentValue = this.currentValue.slice(1);
      } else {
        this.currentValue = '-' + this.currentValue;
      }
    }
  }

  // Percentage
  percentage() {
    this.currentValue = (parseFloat(this.currentValue) / 100).toString();
  }

  // Get current display value (to match test expectations)
  getDisplayText() {
    return this.currentValue;
  }

  // Get calculation text for display
  getCalculationText() {
    if (this.operation === null || this.previousValue === '') {
      return '';
    }
    return `${this.previousValue} ${this.operation}`;
  }

  // Get current display value
  getDisplayValue() {
    return this.currentValue;
  }
}

// Export for use in browser and Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Calculator;
} else if (typeof window !== 'undefined') {
  window.Calculator = Calculator;
}