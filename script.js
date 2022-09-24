let displayValue = '';
let prevAns = null;
let operator = null;
let numArray = [];

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll(".number");
const display = document.querySelector('.display');
const history = document.querySelector('.history');
const decButton = document.getElementById('decimal');
const choose = {
    '+': (a, b) => { return a + b; },
    '-': (a, b) => { return a - b; },
    'x': (a, b) => { return a * b; },
    '/': (a, b) => { return a / b },
}
window.addEventListener('keydown', (e) => keypressHandler(e));
document.getElementById('clear-button').addEventListener('click', (e) => { clear() });
document.getElementById('sign-button').addEventListener('click', (e) => toggleNegative());
decButton.addEventListener('click', (e) => {
    if (displayValue.includes('.')) { decButton.disabled = true; }
});
document.getElementById('equals').addEventListener('click', (e) => {
    if (displayValue != null && numArray.length > 0) {
        operate(operator, numArray[0], displayValue);
        displayValue = null;
    }
});
document.getElementById('delete-button').addEventListener('click', (e) => {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, displayValue.length - 1);
        display.innerText = displayValue;
    }
});
numbers.forEach(element => {
    element.addEventListener("click", (e) => {
        if (displayValue === null) {
            displayValue = element.innerText;
            display.innerText = displayValue;
        }
        else if (displayValue.length < 11) {
            displayValue += element.innerText;
            display.innerText = displayValue;
            displayValue = displayValue;
        }
        if (displayValue.includes('.')) { decButton.disabled = true; return; }
        decButton.disabled = false;
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
    decButton.disabled = false;
}
function addOp(op) {
    switch (numArray.length) {
        case 0:
            numArray.push(display.innerText);
            operator = op;
            displayValue = null;
            display.innerText = displayValue;
            history.innerText = `${numArray[0]} ${op}`;
            break;
        case 1:
            if(displayValue === null){
                operator = op;
                history.innerText = `${numArray[0]} ${op}`;
                return;
            }
            numArray.push(displayValue);
            operate(operator, numArray[0], displayValue);
            history.innerText = `${prevAns} ${op}`;
            numArray[0] = prevAns;
            operator = op;
            displayValue = null;
            break;
        default:
            operate(operator, numArray[0], numArray[1]);
            numArray[0] = prevAns;
            operator = op;
            break;
    }
    decButton.disabled = false;
}
function operate(op, a, b) {
    numa = Number(a);
    numb = Number(b);
    history.innerText = `${numa} ${op} ${numb} = `;
    decButton.disabled = false;
    if (op === '/' && b === '0') {
        display.innerText = ':|';
        return;
    }
    prevAns = choose[op](numa, numb).toString();
    if (prevAns.length > 11) {
        let trimmedValue = prevAns.slice(0, 11);
        prevAns = Number(trimmedValue);
    }
    numArray = [];
    display.innerText = prevAns;
    operator = null;
    displaValue = null;
    return prevAns;
}
function keypressHandler(event) {
    if (parseFloat(event.key) >= 0) { document.getElementById(`${event.key}`).click(); return; }
    if (event.key === '*') { document.getElementById('mult-button').click(); return; }
    if (event.key === '+') { document.getElementById('add-button').click(); return; }
    if (event.key === '-') { document.getElementById('sub-button').click(); return; }
    if (event.key === '/') { document.getElementById('divide-button').click(); return; }
    if (event.key === '.') { decButton.click(); return; }
    if (event.key === 'Enter') { document.activeElement.blur(); document.getElementById('equals').click(); return; }
    if (event.key === 'Backspace' || event.key === "Delete") { document.getElementById('delete-button').click(); }
}
function toggleNegative() {
    if (displayValue.startsWith('-')) {
        let sliced = displayValue.slice(1, displayValue.length);
        displayValue = sliced;
        display.innerText = displayValue;
        return;
    }
    displayValue = "-" + displayValue;
    display.innerText = displayValue;
}