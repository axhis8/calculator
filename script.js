const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;   
}

const divide = function(a, b) {
   return a == 0 ? "ERROR" : a / b; 
}

let firstNum;
let secondNum;
let operator;

function operate(operator, a, b) {
    switch (operator) {
        
        case "+": 
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "×":
            return multiply(a, b);

        case "+":
            return divide(a, b)
    }
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const digits = document.querySelectorAll(".digit");

digits.forEach(digit => digit.addEventListener('click', () => display.textContent += digit.textContent)); 
// Adds Event Listener for every Digit (0-9)

const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");

delBtn.addEventListener('click', () => display.textContent = display.textContent.slice(0, -1));

clearBtn.addEventListener('click', () => {
    display.textContent = ""
    firstNum = 0;
    secondNum = 0;
    operator = "";
});

const operatorBtns = document.querySelectorAll(".operator");
const operationBtn = document.querySelector(".operation");


operatorBtns.forEach((btn) => btn.addEventListener('click', () => {
        firstNum = display.textContent;
        display.textContent = "";
        operator = btn.textContent;
        btn.classList.add("active");
    }));
// Adds Event Listener for every Operator (+, -, *, /)


operationBtn.addEventListener('click', () => {
    secondNum = display.textContent;
    display.textContent = operate(operator, Number(firstNum), Number(secondNum));
    operatorBtns.forEach(btn => btn.classList.remove("active"));
})

