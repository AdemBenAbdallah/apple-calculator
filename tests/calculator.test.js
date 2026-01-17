const Calculator = require('../src/calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Basic operations', () => {
        test('should add numbers correctly', () => {
            calculator.inputNumber('2');
            calculator.chooseOperation('add');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('5');
        });

        test('should subtract numbers correctly', () => {
            calculator.inputNumber('5');
            calculator.chooseOperation('subtract');
            calculator.inputNumber('2');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('3');
        });

        test('should multiply numbers correctly', () => {
            calculator.inputNumber('3');
            calculator.chooseOperation('multiply');
            calculator.inputNumber('4');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('12');
        });

        test('should divide numbers correctly', () => {
            calculator.inputNumber('10');
            calculator.chooseOperation('divide');
            calculator.inputNumber('2');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('5');
        });

        test('should handle division by zero', () => {
            calculator.inputNumber('5');
            calculator.chooseOperation('divide');
            calculator.inputNumber('0');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('Error');
        });
    });

    describe('Number input', () => {
        test('should input single digit', () => {
            calculator.inputNumber('7');
            expect(calculator.getDisplayText()).toBe('7');
        });

        test('should input multiple digits', () => {
            calculator.inputNumber('1');
            calculator.inputNumber('2');
            calculator.inputNumber('3');
            expect(calculator.getDisplayText()).toBe('123');
        });

        test('should handle decimal input', () => {
            calculator.inputNumber('0');
            calculator.inputDecimal();
            calculator.inputNumber('1');
            calculator.inputNumber('2');
            expect(calculator.getDisplayText()).toBe('0.12');
        });

        test('should not allow multiple decimals', () => {
            calculator.inputNumber('1');
            calculator.inputDecimal();
            calculator.inputDecimal();
            expect(calculator.getDisplayText()).toBe('1.');
        });
    });

    describe('Special functions', () => {
        test('should clear all values', () => {
            calculator.inputNumber('5');
            calculator.chooseOperation('add');
            calculator.inputNumber('3');
            calculator.clear();
            expect(calculator.getDisplayText()).toBe('0');
            expect(calculator.operation).toBeNull();
            expect(calculator.previousValue).toBe('');
        });

        test('should negate numbers', () => {
            calculator.inputNumber('5');
            calculator.negate();
            expect(calculator.getDisplayText()).toBe('-5');
            calculator.negate();
            expect(calculator.getDisplayText()).toBe('5');
        });

        test('should calculate percentage', () => {
            calculator.inputNumber('50');
            calculator.percentage();
            expect(calculator.getDisplayText()).toBe('0.5');
        });
    });

    describe('Chain operations', () => {
        test('should handle chained additions', () => {
            calculator.inputNumber('2');
            calculator.chooseOperation('add');
            calculator.inputNumber('3');
            calculator.chooseOperation('add');
            calculator.inputNumber('3');
            calculator.calculate();
            expect(calculator.getDisplayText()).toBe('8'); // 2+3+3=8
        });
    });

    describe('Display formatting', () => {
        test('should show calculation text', () => {
            calculator.inputNumber('5');
            calculator.chooseOperation('add');
            expect(calculator.getCalculationText()).toBe('5 +');
        });

        test('should show empty calculation text when no operation', () => {
            expect(calculator.getCalculationText()).toBe('');
        });
    });
});