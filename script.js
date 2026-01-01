/* =========================
    1. DOM
========================= */

const display = {
    div: document.querySelector(".display"),
    getText() { return this.div.textContent; },
    setText(text) { this.div.textContent = text; },
    MAX_DISPLAY_DIGITS: 12
}

const button = {
    digits: document.querySelectorAll(".digit"),
    deleteDigit: document.querySelector(".delete"),
    clear: document.querySelector(".clear"),
    operators: document.querySelectorAll(".operator"),
    operate: document.querySelector(".operation"),
    decimal: document.querySelector(".dot"),
    toggleSign: document.querySelector(".plus-minus"),
    percent: document.querySelector(".percent")
}

/* =========================
    2. STATE
========================= */

const state = {
    firstNum: null,
    secondNum: null,
    operator: "",
    resultOnDisplay: false,
    toggleOperators: false,
    operatorBtnPressed: false
}

/* =========================
    3. MATH
========================= */

const math = {
    add(a, b) { return a + b; },
    subtract(a, b) { return a - b; },
    multiply(a, b) { return a * b; },
    divide(a, b) { return b === 0 ? "ERROR" : a / b; }, // Checks if a number is divided by 0, if so return "ERROR"   

    operate(operator, a, b) {
        switch (operator) {
            
            case "+": 
                return this.add(a, b);

            case "-":
                return this.subtract(a, b)

            case "×":
                return this.multiply(a, b);

            case "÷":
                return this.divide(a, b);

            default:
                return null;
        }
    }
}

/* =========================
    4. ACTIONS / INPUT
========================= */

const input = {
    calculate() {
        state.operatorBtnPressed = false;
        state.resultOnDisplay = true;
        state.secondNum = display.getText();
        display.setText(this.roundDecimal(math.operate(state.operator, Number(state.firstNum), Number(state.secondNum))));
        // Equates the given digits & rounds the Decimals so it doesn't overpopulate the Display
    },

    roundDecimal(num) {
        num = String(num);
        if (num.includes(".")) {
            let numArray = num.split(".");

            if (numArray[1].length > 12) {
                num = Number(num).toFixed(2);
                return num.endsWith("0") ? num.slice(0, -1) : num;
            }
        }
        return num;
    }, 
// Checks if the Result has Decimals, splits it into an Array and checks if the Length is above the Display Limit. 
// If so, set the decimals only to two & if 0 is the last digit, remove it.
// This also handles the problem with JavaScripts Rounding on decimal numbers.
    
    typeDigit(num) {

        if (state.resultOnDisplay) {
            state.resultOnDisplay = false;
            display.setText("");
        }
        if (state.toggleOperators) {
            state.toggleOperators = false;
        }

        display.setText(display.getText() + num);
        button.operators.forEach(btn => btn.classList.remove("active"));
    },

    typeOperator(btn) {

        if (state.toggleOperators) {
            button.operators.forEach(btn => btn.classList.remove("active"));
        } // Toggles Operator, without changing results

        else if (state.operatorBtnPressed) {
            input.calculate();
            state.firstNum = display.getText();
        } // Checks if a Operator is already pressed, so that it equates the numbers & shows it on the Display

        else {
            state.firstNum = display.getText();
            state.operatorBtnPressed = true;
            display.setText("");
        }

        state.operator = btn.textContent;
        state.toggleOperators = true;
        btn.classList.add("active");
    },

    checkDecimal() {
        if (display.getText().includes(".")) return "";
        else if (display.getText() === "") return "0.";
        else return ".";
    },
    // Checks if the Display already contains a decimal, if so don't return one

    toggleClassActive(btn) {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 100);
    },
    // Adds Animation for Buttons when clicked with a keyboard key

    deleteLastDigit() { display.setText(display.getText().slice(0, -1)); },

    addDecimal() { display.setText(display.getText() + input.checkDecimal()); },

    toPercent() { display.setText(display.getText() / 100); },

    toggleSign() { display.setText(display.getText() * -1) },
 
    reset() {
        display.setText("");
        state.operator = "";
        state.firstNum = null;
        state.secondNum = null;
        state.resultOnDisplay = false;
        state.operatorBtnPressed = false;
        button.operators.forEach(btn => btn.classList.remove("active"));
    }    
}

/* =========================
    5. INIT
========================= */

function init() {
    button.clear.addEventListener('click', input.reset);
    button.percent.addEventListener('click', input.toPercent);
    button.decimal.addEventListener('click', input.addDecimal);
    button.toggleSign.addEventListener('click', input.toggleSign);
    button.deleteDigit.addEventListener('click', input.deleteLastDigit);

    button.digits.forEach(digit => digit.addEventListener('click', () => input.typeDigit(digit.textContent)));

    button.operators.forEach(btn => btn.addEventListener('click', () => input.typeOperator(btn))); 
    // Adds Event Listener for every Operator (+, -, *, /)

    button.operate.addEventListener('click', () => {
        if (state.firstNum === null) return;
        input.calculate();
    });

    document.addEventListener('keydown', (e) => {

        // Digits
        button.digits.forEach(digit => {
            if (e.key === digit.textContent) {
                input.typeDigit(digit.textContent);
                input.toggleClassActive(digit);
            }
        });

        // Operators / Specials
        switch (e.key) {

            case "Backspace":
                input.deleteLastDigit();
                input.toggleClassActive(button.deleteDigit);
                break;

            case "%":
                input.toPercent();
                input.toggleClassActive(button.percent);
                break;

            case ".":
                input.addDecimal();
                input.toggleClassActive(button.decimal);
                break;

            case "Enter":
                e.preventDefault();   
                if (!state.firstNum) return;

                input.toggleClassActive(button.operate);
                input.calculate();
                break;
        }
    });
}

init();