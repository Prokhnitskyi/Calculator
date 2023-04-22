const display = document.querySelector('.calculator__display');
const digitButtons = document.querySelectorAll('.grid-button--digit');
const controlButtons = document.querySelectorAll('.grid-button--controls');
const clearButton = document.querySelector('.grid-button--clear');
const operateButton = document.querySelector('.grid-button--operate');
let displayBuffer = '';
let firstNumber;
let operator;
let calculated = false;

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate(firstNumber, secondNumber, operator) {
    let result;

    switch (operator) {
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
        default:
            throw new Error('Unknown operation');
    }
    calculated = true;
    return result;
}

function type(event) {
    const key = event.key;
    const numbersRegex = new RegExp(/[\d\.,]/, 'i');
    const operatorsRegex = new RegExp(/[\-+\/\*]/, 'i');

    if (key.match(numbersRegex)) {
        addNumber(key);
    } else if (key.match(operatorsRegex)) {
        addOperator(key)
    }
}

function populateDisplay(displayString, storeAndClear = false) {
    if (storeAndClear) {
        firstNumber = displayBuffer;
        displayBuffer = '';
        display.textContent = displayString;
    } else {
        setDisplayValue(displayBuffer + displayString);
    }
}

function addNumber(key) {
    if(calculated) { // start from new if user types number with result of last operation
        setDisplayValue('');
        calculated = false;
    }

    const number = this.textContent || key;

    if (number === '.' && displayBuffer.includes('.')) return;

    populateDisplay(number);
}

function addOperator(key) {
    const pushedOperator = this.textContent || key;

    if (displayBuffer === '' && pushedOperator === '-') {
        setDisplayValue(pushedOperator);
        return;
    }
    if (displayBuffer !== '') {
        populateDisplay(pushedOperator, true);
        operator = pushedOperator;
    }
}

function clear() {
    setDisplayValue('');
    firstNumber = '';
    calculated = false;
}

function calculate() {
    const result = operate(firstNumber, displayBuffer, operator);
    setDisplayValue(result);
}

function handleKeyboard (event) {
    if (event.key === 'Backspace') {
        setDisplayValue(displayBuffer.slice(0, -1));
        return;
    }

    if (event.key === '=') {
        calculate();
    } else {
        type(event);
    }
}

function setDisplayValue(value) {
    if (Number.isNaN(value)) {
        clear();
        display.textContent = 'ERROR';
        return;
    }

    displayBuffer = value;
    display.textContent = value;
}

document.addEventListener('keydown', handleKeyboard);
digitButtons.forEach((btn) => btn.addEventListener('click', addNumber));
controlButtons.forEach((btn) => btn.addEventListener('click', addOperator));
clearButton.addEventListener('click', clear);
operateButton.addEventListener('click', calculate);