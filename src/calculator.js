class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
    }

    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetScreen = false;
    }

    inputNumber(number) {
        if (this.shouldResetScreen) {
            this.currentValue = '';
            this.shouldResetScreen = false;
        }

        if (this.currentValue === '0') {
            this.currentValue = number.toString();
        } else if (this.currentValue.length < 9) {
            this.currentValue += number.toString();
        }
    }

    inputDecimal() {
        if (this.shouldResetScreen) {
            this.currentValue = '0';
            this.shouldResetScreen = false;
        }

        if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
    }

    negate() {
        if (this.currentValue !== '0') {
            if (this.currentValue.startsWith('-')) {
                this.currentValue = this.currentValue.slice(1);
            } else {
                this.currentValue = '-' + this.currentValue;
            }
        }
    }

    percentage() {
        const num = parseFloat(this.currentValue);
        this.currentValue = (num / 100).toString();
    }

    chooseOperation(op) {
        if (this.operation !== null) {
            this.calculate();
        }

        this.previousValue = this.currentValue;
        this.operation = op;
        this.shouldResetScreen = true;
    }

    calculate() {
        if (this.operation === null || this.previousValue === '') return;

        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);

        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.currentValue = 'Error';
                    this.operation = null;
                    this.previousValue = '';
                    this.shouldResetScreen = true;
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Handle very large or very small numbers
        if (Math.abs(result) > 999999999) {
            this.currentValue = result.toExponential(4);
        } else if (Math.abs(result) < 0.0000001 && result !== 0) {
            this.currentValue = result.toExponential(4);
        } else {
            // Round to avoid floating point precision issues
            this.currentValue = Math.round(result * 100000000) / 100000000;
            this.currentValue = this.currentValue.toString();
        }

        this.operation = null;
        this.previousValue = '';
        this.shouldResetScreen = true;
    }

    getDisplayText() {
        return this.currentValue;
    }

    getCalculationText() {
        if (this.operation === null || this.previousValue === '') {
            return '';
        }

        const operatorSymbol = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        }[this.operation];

        return `${this.previousValue} ${operatorSymbol}`;
    }
}

// Export for use in other modules
module.exports = Calculator;