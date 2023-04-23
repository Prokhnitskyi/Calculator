const display = document.querySelector('.display-number');
const shownOperator = document.querySelector('.display-operator');
const digitButtons = document.querySelectorAll('.grid-button--digit');
const controlButtons = document.querySelectorAll('.grid-button--controls');
const clearButton = document.querySelector('.grid-button--clear');
const operateButton = document.querySelector('.grid-button--operate');

let firstValue = '';
let secondValue = '';
let start = true;
let operator = '';


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

    return result;
}

function addNumber(key) {
    const number = this.textContent || key;
    if (number === '.' && display.textContent.includes('.')) return;
    populate(number);
}

function addOperator(key) {
    const selectedOperator = this.textContent || key;
    if (display.textContent === '' && selectedOperator === '-') {
        populate(selectedOperator);
        return;
    }

    if(display.textContent !== '') {
        start = false;
        operator = selectedOperator;
        shownOperator.textContent = operator;
        display.textContent = '';
    }
}

function populate(stringValue) {
    display.textContent += stringValue;
    if (start === true) {
        firstValue = display.textContent;
    } else {
        shownOperator.textContent = '';
        secondValue = display.textContent;
    }
}

function clear() {
    firstValue = secondValue = display.textContent = shownOperator.textContent = '';
}

function calculate() {
    if (!firstValue || !secondValue) return;

    firstValue = operate(firstValue, secondValue, operator);
    start = false;
    display.textContent = firstValue;
}

digitButtons.forEach((btn) => btn.addEventListener('click', addNumber));
controlButtons.forEach((btn) => btn.addEventListener('click', addOperator));
clearButton.addEventListener('click', clear);
operateButton.addEventListener('click', calculate);