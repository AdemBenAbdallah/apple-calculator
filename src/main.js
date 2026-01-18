// Apple Calculator UI Logic
class CalculatorUI {
    constructor() {
        this.calculator = new Calculator();
        this.resultElement = document.getElementById('result');
        this.calculationElement = document.getElementById('calculation');
        
        this.init();
    }

    init() {
        this.attachButtonListeners();
        this.attachKeyboardListeners();
        this.updateDisplay();
    }

    attachButtonListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                const number = button.dataset.number;
                if (number === 'decimal') {
                    this.calculator.inputDecimal();
                } else {
                    this.calculator.inputNumber(number);
                }
                this.updateDisplay();
            });
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', () => {
                const operator = button.dataset.operator;
                if (operator === 'equals') {
                    this.calculator.calculate();
                } else {
                    const operationMap = {
                        'add': 'add',
                        'subtract': 'subtract',
                        'multiply': 'multiply',
                        'divide': 'divide'
                    };
                    this.calculator.chooseOperation(operationMap[operator] || operator);
                }
                this.updateDisplay();
            });
        });

        // Function buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                switch (action) {
                    case 'clear':
                        this.calculator.clear();
                        break;
                    case 'negate':
                        this.calculator.negate();
                        break;
                    case 'percent':
                        this.calculator.percentage();
                        break;
                }
                this.updateDisplay();
            });
        });
    }

    attachKeyboardListeners() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
            
            const key = event.key;
            
            // Numbers (0-9)
            if (key >= '0' && key <= '9') {
                this.calculator.inputNumber(key);
            }
            // Decimal point
            else if (key === '.') {
                this.calculator.inputDecimal();
            }
            // Operators
            else if (key === '+') {
                this.calculator.chooseOperation('add');
            }
            else if (key === '-') {
                this.calculator.chooseOperation('subtract');
            }
            else if (key === '*') {
                this.calculator.chooseOperation('multiply');
            }
            else if (key === '/') {
                this.calculator.chooseOperation('divide');
            }
            // Enter or = for calculation
            else if (key === 'Enter' || key === '=') {
                this.calculator.calculate();
            }
            // Escape for clear
            else if (key === 'Escape') {
                this.calculator.clear();
            }
            // Backspace for delete last digit
            else if (key === 'Backspace') {
                const currentValue = this.calculator.getDisplayValue();
                if (currentValue.length > 1) {
                    this.calculator.currentValue = currentValue.slice(0, -1);
                } else {
                    this.calculator.currentValue = '0';
                }
            }
            // % for percentage
            else if (key === '%') {
                this.calculator.percentage();
            }
            
            this.updateDisplay();
        });
    }

    updateDisplay() {
        const result = this.calculator.getDisplayValue();
        const calculation = this.calculator.getCalculationText();
        
        // Format result with commas for large numbers
        if (result && !isNaN(result) && result !== 'Error') {
            const num = parseFloat(result);
            if (!isNaN(num)) {
                // Handle very large numbers
                if (Math.abs(num) >= 1e10) {
                    this.resultElement.textContent = num.toExponential(6);
                } else {
                    // Add commas for readability
                    const parts = result.split('.');
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    this.resultElement.textContent = parts.join('.');
                }
            } else {
                this.resultElement.textContent = result;
            }
        } else {
            this.resultElement.textContent = result || '0';
        }
        
        // Update calculation display
        this.calculationElement.textContent = calculation;
        
        // Handle error state
        if (result === 'Error') {
            this.resultElement.classList.add('error');
        } else {
            this.resultElement.classList.remove('error');
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});