let displayValue = null;
let num1 = null;
let result = null;
let prevAns = null;
let operator = null;
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll(".number");
const display = document.querySelector('.display');
document.getElementById('clear-button').addEventListener('click', (e) => { clear() });

document.getElementById('equals').addEventListener('click', (e) => {
    result = operate(operator, num1, displayValue);
    display.innerText = result;
    prevAns = result;
});

display.innerText = Number(displayValue);
numbers.forEach(element => {
    element.addEventListener("click", (e) => {
        if (displayValue == null) {
            displayValue = Number(element.innerText);
            display.innerText = displayValue;
        }
        else if (String(displayValue).length < 11) {
            displayValue += element.innerText;
            display.innerText = displayValue;
            displayValue = Number(displayValue);
        }
    })
});
operators.forEach(element => {
    element.addEventListener('click', (e) => {
        if(prevAns != null){
            num1 = prevAns;
            displayValue = null;
            operator = element.innerText;
            display.innerText += element.innerText;
            return;
        }
        num1 = Number(displayValue);
        displayValue = null;
        operator = element.innerText;
        display.innerText += element.innerText;
    })
});
function clear() {
    displayValue = null;
    operator = null;
    prevAns = null;
    num1 = null;
    display.innerText = displayValue;
}
function operate(op, a, b) {
    let result = choose[op](a, b);
    return Number(result);
}
const choose = {
    '+': (a, b) => { return a + b; },
    '-': (a, b) => { return a - b; },
    '*': (a, b) => { return a * b; },
    '/': (a, b) => { return a / b },
}