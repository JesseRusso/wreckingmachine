let displayValue = 0;
const display = document.querySelector('.display');
display.innerText = Number(displayValue);

const buttons = document.querySelectorAll(".number");
buttons.forEach(element => {
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