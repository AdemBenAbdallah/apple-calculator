// Calculator UI Controller
class CalculatorUI {
    constructor() {
        this.calculator = new Calculator();
        this.resultElement = document.getElementById('result');
        this.calculationElement = document.getElementById('calculation');
        
        this.initEventListeners();
        this.updateDisplay();
    }

    initEventListeners() {
        // Button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Prevent zoom on double tap for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
    }

    handleButtonClick(button) {
        // Add visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        // Handle different button types
        if (button.dataset.number !== undefined) {
            this.calculator.inputNumber(button.dataset.number);
        } else if (button.dataset.operator !== undefined) {
            this.calculator.chooseOperation(button.dataset.operator);
        } else if (button.dataset.action !== undefined) {
            this.handleAction(button.dataset.action);
        }

        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'ac':
                this.calculator.clear();
                break;
            case 'negate':
                this.calculator.negate();
                break;
            case 'percent':
                this.calculator.percentage();
                break;
            case 'decimal':
                this.calculator.inputDecimal();
                break;
            case 'equals':
                this.calculator.calculate();
                break;
        }
    }

    handleKeyPress(e) {
        // Prevent default for calculator keys
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '=', 'Enter', 'Escape', 'Backspace'].includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.calculator.inputNumber(e.key);
                break;
            case '.':
                this.calculator.inputDecimal();
                break;
            case '+':
                this.calculator.chooseOperation('add');
                break;
            case '-':
                this.calculator.chooseOperation('subtract');
                break;
            case '*':
                this.calculator.chooseOperation('multiply');
                break;
            case '/':
                this.calculator.chooseOperation('divide');
                break;
            case '=':
            case 'Enter':
                this.calculator.calculate();
                break;
            case 'Escape':
                this.calculator.clear();
                break;
            case 'Backspace':
                this.handleBackspace();
                break;
        }

        this.updateDisplay();
    }

    handleBackspace() {
        const current = this.calculator.currentValue;
        if (current.length > 1) {
            this.calculator.currentValue = current.slice(0, -1);
        } else {
            this.calculator.currentValue = '0';
        }
    }

    updateDisplay() {
        const resultText = this.calculator.getDisplayText();
        const calculationText = this.calculator.getCalculationText();

        // Update result display
        this.resultElement.textContent = this.formatNumber(resultText);
        
        // Add animation class for updates
        this.resultElement.classList.add('updating');
        setTimeout(() => {
            this.resultElement.classList.remove('updating');
        }, 100);

        // Update calculation display
        if (calculationText) {
            this.calculationElement.textContent = calculationText;
            this.calculationElement.classList.add('visible');
        } else {
            this.calculationElement.classList.remove('visible');
        }

        // Handle error state
        if (resultText === 'Error') {
            this.resultElement.style.color = '#FF6B6B';
        } else {
            this.resultElement.style.color = '#ffffff';
        }
    }

    formatNumber(numStr) {
        if (numStr === 'Error') {
            return 'Error';
        }

        // Don't format if it's in scientific notation
        if (numStr.includes('e')) {
            return numStr;
        }

        const num = parseFloat(numStr);
        
        // Handle very large numbers
        if (Math.abs(num) > 999999999) {
            return num.toExponential(4);
        }

        // Format with commas for readability
        if (numStr.includes('.')) {
            const parts = numStr.split('.');
            const integerPart = parseInt(parts[0]).toLocaleString();
            return integerPart + '.' + parts[1];
        } else {
            return parseInt(numStr).toLocaleString();
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CalculatorUI, Calculator };
}