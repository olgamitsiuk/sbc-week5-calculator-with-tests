export function calculate (num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch(operator) {
        case '+':
            return a + b;
            
        case '-':
            return a - b;
            
        case '*':
            return a * b;
            
        case '/':
            return b === 0 ? 'Error' : a/b;
        
        default:
            return num1    
    }
}

export function appendNumber (currentValue, newDigit) {
    if(currentValue === 0 && newDigit !== '.') {
        return newDigit
    };
    if (newDigit === '.' && currentValue.includes('.')) {
        return currentValue;
    };
    if (currentValue.length >= 12) {
        return currentValue;
    };
    return currentValue + newDigit;
}

export function formatNumber(value) {
    if (!value) return '0';
    if (value === 'Error') return value;
    
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    
    let result = num.toString();

    if (result.length > 12) {
        if (result.includes('.')) {
            
            result = num.toFixed(12 - result.split('.')[0].length);
        } else {
            
            result = num.toExponential(7);
        }
    }
    
    return result;
}