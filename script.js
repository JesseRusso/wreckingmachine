let displayValue = "";
let prevAns = null;
let operator = null;
let numArray = [];
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll(".number");
const display = document.querySelector('.display');
const history = document.querySelector('.history');
document.getElementById('clear-button').addEventListener('click', (e) => { clear() });

document.getElementById('equals').addEventListener('click', (e) => {
    if (displayValue != null) {
        operate(operator, numArray[0], displayValue);
    }
});
display.innerText = displayValue;
numbers.forEach(element => {
    element.addEventListener("click", (e) => {
        if (displayValue == null) {
            displayValue = element.innerText;
            display.innerText = displayValue;
        }
        else if (displayValue.length < 11) {
            displayValue += element.innerText;
            display.innerText = displayValue;
            displayValue = displayValue;
        }
    })
});
operators.forEach(element => {
    element.addEventListener('click', (e) => {
        addOp(element.innerText);
    })
});
function clear() {
    displayValue = null;
    operator = null;
    prevAns = null;
    history.innerText = "";
    numArray = [];
    display.innerText = displayValue;
}
function addOp(op) {
    switch (numArray.length) {
        case 0:
            numArray.push(displayValue);
            operator = op;
            displayValue = null;
            display.innerText = displayValue;
            history.innerText = `${numArray[0]} ${op}`;
            break;
        case 1:
            numArray.push(displayValue);
            operate(operator, numArray[0], numArray[1]);
            history.innerText = `${prevAns} ${op}`;
            numArray = [];
            numArray[0] = prevAns;
            operator = op;
            displayValue = null;
            break;
        case 2:
            operate(operator, numArray[0], numArray[1]);
            numArray = [];
            numArray[0] = prevAns;
            operator = op;
            displayValue = null;
            break;
        default: console.log('oooops');
            break;
    }
}
function operate(op, a, b) {
    numa = Number(a);
    numb = Number(b);
    history.innerText = `${numa} ${op} ${numb} = `;
    if (op == '/' && numb == 0) {
        display.innerText = ':|';
        return;
    }
    prevAns = choose[op](numa, numb);
    display.innerText = prevAns;
    return prevAns;
}
const choose = {
    '+': (a, b) => { return a + b; },
    '-': (a, b) => { return a - b; },
    '*': (a, b) => { return a * b; },
    '/': (a, b) => { return a / b },
}