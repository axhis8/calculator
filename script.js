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
   return b === 0 ? "ERROR" : a / b;
}
// Checks if a number is divided by 0, if so return "ERROR"

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

function roundDecimal(num) {
    num = String(num);
    if (num.includes(".")) {
        let numArray = num.split(".");

        if (numArray[1].length > 12) return Number(num).toFixed(2);
    }
    
    return num;
}
// Checks if the Result has Decimals, splits it into an Array and checks if the Length is above the Display Limit. 
// If so, set the decimals only to two. 
// This also handles the problem with JavaScripts Rounding on decimal numbers.

function reset() {
    display.textContent = "";
    operator = "";
    firstNum = 0;
    secondNum = 0;
    resultOnDisplay = false;
    operatorBtnPressed = false;
    
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

clearBtn.addEventListener('click', reset);


const operatorBtns = document.querySelectorAll(".operator");
const operationBtn = document.querySelector(".operation");

let firstNum = 0;
let secondNum = 0;
let operator = "";
let resultOnDisplay = false;
let operatorBtnPressed = false;

const result = () => roundDecimal(operate(operator, Number(firstNum), Number(secondNum)));
// Equates the given digits & rounds the Decimals so it doesn't overpopulate the Display

operatorBtns.forEach((btn) => btn.addEventListener('click', () => {

    if (operatorBtnPressed) {
        secondNum = display.textContent;

        display.textContent = result();
        firstNum = display.textContent;
                
        resultOnDisplay = true;
    } 
// Checks if a Operator is already pressed, so that it equates the numbers & shows it on the Display

    else {
        firstNum = display.textContent;
        display.textContent = "";
        operatorBtnPressed = true;
    }

    operator = btn.textContent;
    btn.classList.add("active");

    }));
// Adds Event Listener for every Operator (+, -, *, /)

operationBtn.addEventListener('click', () => {
    if (!firstNum) return;

    secondNum = display.textContent
    display.textContent = result();

    operatorBtnPressed = false;
    resultOnDisplay = true;

});


const decimalBtn = document.querySelector(".dot");
const checkDecimal = () => display.textContent.includes(".") ? "" : ".";
// Checks if the Display already contains a decimal, if so don't return one

decimalBtn.addEventListener('click', () => display.textContent += checkDecimal());


const toggleSignBtn = document.querySelector(".plus-minus");
const percentBtn = document.querySelector(".percent");

const getCurrentNum = () => Number(display.textContent);

toggleSignBtn.addEventListener('click', () => display.textContent = getCurrentNum() * -1);
// Toggles sign of the displayed Number

percentBtn.addEventListener('click', () => display.textContent = getCurrentNum() / 100);
// Toggles the Number to percent