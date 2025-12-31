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

function reset() {
    display.textContent = "";
    operator = "";
    firstNum = 0;
    secondNum = 0;
    result = 0;
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

clearBtn.addEventListener('click', () => reset());


const operatorBtns = document.querySelectorAll(".operator");
const operationBtn = document.querySelector(".operation");

let firstNum = 0;
let secondNum = 0;
let operator = "";
let result = 0;
let resultOnDisplay = false;
let operatorBtnPressed = false;

operatorBtns.forEach((btn) => btn.addEventListener('click', () => {

    if (operatorBtnPressed) {
        secondNum = display.textContent;

        result = String(operate(operator, Number(firstNum), Number(secondNum))).substring(0, 12);

        display.textContent = result;
        firstNum = result;
                
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
    if (!firstNum) {
        return;
    }

    operatorBtnPressed = false;
    secondNum = display.textContent
    result = String(operate(operator, Number(firstNum), Number(secondNum))).substring(0, 12); 
// Sets the result to max 12 Characters, so it doesn't overpopulate the Display

    display.textContent = result; 
    resultOnDisplay = true;

});


const toggleSign = document.querySelector(".plus-minus");

toggleSign.addEventListener('click', () => {
    let num;
    num = Number(display.textContent) * -1;

    display.textContent = num;
})
// Toggles sign of the displayed Number