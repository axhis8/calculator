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
   return a / b; 
}

let firstNum;
let secondNum;
let operator;

function operate(operator, a, b) {
    switch (operator) {
        
        case "+": {
            add(a, b);
        } 

        case "-": {
            subtract(a, b);
        } 

        case "*": {
            multiply(a, b);
        } 

        case "/": {
            divide(a, b);
        } 
    }
}