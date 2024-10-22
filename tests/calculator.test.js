
const { calculate, appendNumber } = require('../public/assets/js/calculator.сjs');

describe('Calculator', () => {
    describe('Basic Operations', () => {
        test('should add two numbers correctly', () => {
            expect(calculate('2', '3', '+')).toBe(5);
        });

        test('should subtract two numbers correctly', () => {
            expect(calculate('5', '3', '-')).toBe(2);
        });

        test('should multiply two numbers correctly', () => {
            expect(calculate('4', '3', '*')).toBe(12);
        });

        test('should divide two numbers correctly', () => {
            expect(calculate('6', '2', '/')).toBe(3);
        });

        test('should return error when dividing by zero', () => {
            expect(calculate('6', '0', '/')).toBe('Error');
        });
    });

    describe('Number Input', () => {
        test('should append digit correctly', () => {
            expect(appendNumber('1', '2')).toBe('12');
        });

        test('should handle decimal point', () => {
            expect(appendNumber('1', '.')).toBe('1.');
            expect(appendNumber('1.2', '.')).toBe('1.2');
        });

        test('should handle zero at start', () => {
            expect(appendNumber(0, '5')).toBe('5');
        });

        test('should limit length to 12 digits', () => {
            const longNumber = '123456789012';
            expect(appendNumber(longNumber, '3')).toBe(longNumber);
        });
    });
});