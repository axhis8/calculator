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
   return b == 0 ? "ERROR" : a / b;
}   

function operate(operator, a, b) {

    switch (operator) {
        
        case "+": 
            return add(a, b);

        case "-":
            return subtract(a, b)

        case "×":
            return multiply(a, b);

        case "÷":
            return divide(a, b);

    }
}

function reset() {
    display.textContent = "";
    operator = "";
    firstNum = 0;
    secondNum = 0;
    
    operatorBtns.forEach(btn => btn.classList.remove("active"));
}


const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");

digits.forEach(digit => digit.addEventListener('click', () => {

    if (resultOnDisplay) {
        resultOnDisplay = false;
        display.textContent = "";
    }

    display.textContent += digit.textContent;
    operatorBtns.forEach(btn => btn.classList.remove("active"));
})); 
// Adds Event Listener for every Digit (0-9)


const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");

delBtn.addEventListener('click', () => display.textContent = display.textContent.slice(0, -1));

clearBtn.addEventListener('click', () => reset());


const operatorBtns = document.querySelectorAll(".operator");
const operationBtn = document.querySelector(".operation");

let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;
let resultOnDisplay = false;

operatorBtns.forEach((btn) => btn.addEventListener('click', () => {

    operator = btn.textContent;
    firstNum = display.textContent;
    display.textContent = "";
    btn.classList.add("active");

    }));
// Adds Event Listener for every Operator (+, -, *, /)

operationBtn.addEventListener('click', () => {
    if (!firstNum) {
        return;
    }

    secondNum = display.textContent
    result = String(operate(operator, Number(firstNum), Number(secondNum))).substring(0, 12); 
    // Sets the result to max 12 Characters to not overpopulate the Display

    display.textContent = result; 
    resultOnDisplay = true;

});