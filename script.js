let displayValue = 0;
let num1;
let num2;
let operator;
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll(".number");
const display = document.querySelector('.display');
document.getElementById('clear-button').addEventListener('click',(e) => {clear()});
document.getElementById('equals', (e) => {
    displayValue = Number(operate(operator, num1, displayValue));
    display.innerText = displayValue;
});

display.innerText = Number(displayValue);
numbers.forEach(element => {
    element.addEventListener("click", (e) => {
        if (displayValue == 0) {
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
    element.addEventListener('click', (e) =>{
        num1 = Number(displayValue);
        operator = element.innerText;
        clear();
    })
});
function clear(){
    displayValue = 0;
    display.innerText = displayValue;
}
function operate(op, a, b) {
    let result = choose[op](a, b);
    return result;
}
const choose = {
    '+': (a, b) => { return a + b; },
    '-': (a, b) => { return a - b; },
    '*': (a, b) => { return a * b; },
    '/': (a, b) => { return a / b },
}