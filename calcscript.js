
const display = document.getElementById('display');


let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;


function appendToDisplay(value) {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') {
            return; 
        }
        
        if (currentInput !== '' && previousInput !== '' && operator !== '') {
            calculate(); 
        }
        
        operator = value;
        previousInput = currentInput || display.value;
        currentInput = '';
        shouldResetDisplay = true;
        display.value += ' ' + (value === '*' ? '×' : value) + ' ';
        return;
    }
    
    
    if (value === '.') {
        if (currentInput.includes('.')) {
            return; 
        }
        if (currentInput === '') {
            currentInput = '0.';
            display.value = currentInput;
            return;
        }
    }
    
  
    currentInput += value;
    
    if (shouldResetDisplay) {
        display.value = value;
        shouldResetDisplay = false;
    } else {
        display.value += value;
    }
}


function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
   
    if (operator === '/' && current === 0) {
        display.value = 'Error';
        resetCalculator();
        return;
    }
    
    
    switch (operator) {
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
            result = prev / current;
            break;
        default:
            return;
    }
    
   
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(8));
    }
    
    display.value = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
    shouldResetDisplay = true;
}


function clearDisplay() {
    display.value = '';
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}


function deleteLast() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
        
        
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
        }
    }
}


function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    
    
    if (key === '+' || key === '-') {
        appendToDisplay(key);
    }
    
    if (key === '*') {
        appendToDisplay('*');
    }
    
    if (key === '/') {
        event.preventDefault(); 
        appendToDisplay('/');
    }
    
    
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    
   
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});


display.placeholder = '0';