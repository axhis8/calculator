/* =========================
    1. DOM
========================= */

const display = {
    display: document.querySelector(".input"),
    displayGetText() { return this.display.textContent; },
    displaySetText(text) { this.display.textContent = text; },
    MAX_DISPLAY_DIGITS: 12,

    history: document.querySelector(".history"),
    historySetText(firstNum, operator, secondNum) { this.history.textContent = `${firstNum} ${operator} ${secondNum}`; },
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
    4. ACTIONS
========================= */

const action = {
    calculate() {
        state.operatorBtnPressed = false;
        state.resultOnDisplay = true;
        state.secondNum = display.displayGetText();
        display.historySetText(state.firstNum, state.operator, state.secondNum);
        display.displaySetText(this.roundDecimal(math.operate(state.operator, Number(state.firstNum), Number(state.secondNum))));
        // Equates the given digits & rounds the Decimals so it doesn't overpopulate the Display
    },

    roundDecimal(num) {
        num = String(num);
        if (num.includes(".")) {
            let numArray = num.split(".");

            if (numArray[1].length > display.MAX_DISPLAY_DIGITS) {
                num = Number(num).toFixed(2);
                return num.endsWith("0") ? num.slice(0, -1) : num;
            }
        }
        return num;
    }, 
// Checks if the Result has Decimals, splits it into an Array and checks if the Length is above the Display Limit. 
// If so, set the decimals only to two & if 0 is the last digit, remove it.
    
    typeDigit(num) {

        if (state.resultOnDisplay) {
            state.resultOnDisplay = false;
            display.displaySetText("");
        }
        if (state.toggleOperators) {
            state.toggleOperators = false;
        }

        display.displaySetText(display.displayGetText() + num);
        button.operators.forEach(btn => btn.classList.remove("active"));
    },

    typeOperator(btn) {

        if (state.toggleOperators) {
            button.operators.forEach(btn => btn.classList.remove("active"));
        } // Toggles Operator, without changing results

        else if (state.operatorBtnPressed) {
            action.calculate();
            state.firstNum = display.displayGetText();
        } // Checks if a Operator is already pressed, so that it equates the numbers & shows it on the Display

        else {
            state.firstNum = display.displayGetText();
            state.operatorBtnPressed = true;
            display.historySetText(state.firstNum, btn.textContent, "");
            display.displaySetText("");
        }

        state.operator = btn.textContent;
        state.toggleOperators = true;
        btn.classList.add("active");
    },

    checkDecimal() {
        if (display.displayGetText().includes(".")) return "";
        else if (display.displayGetText() === "") return "0.";
        else return ".";
    },
    // Checks if the Display already contains a decimal, if so don't return one

    toggleClassActive(btn) {
        btn.classList.add("active");
        setTimeout(() => btn.classList.remove("active"), 100);
    },
    // Adds Animation for Buttons when clicked with a keyboard key

    deleteLastDigit() { display.displaySetText(display.displayGetText().slice(0, -1)); },

    addDecimal() { display.displaySetText(display.displayGetText() + action.checkDecimal()); },

    toPercent() { display.displaySetText(display.displayGetText() / 100); },

    toggleSign() { display.displaySetText(display.displayGetText() * -1) },
 
    reset() {
        display.historySetText("", "", "");
        display.displaySetText("");
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
    button.clear.addEventListener('click', action.reset);
    button.percent.addEventListener('click', action.toPercent);
    button.decimal.addEventListener('click', action.addDecimal);
    button.toggleSign.addEventListener('click', action.toggleSign);
    button.deleteDigit.addEventListener('click', action.deleteLastDigit);

    button.digits.forEach(digit => digit.addEventListener('click', () => action.typeDigit(digit.textContent)));

    button.operators.forEach(btn => btn.addEventListener('click', () => action.typeOperator(btn))); 
    // Adds Event Listener for every Operator (+, -, *, /)

    button.operate.addEventListener('click', () => {
        if (state.firstNum === null) return;
        action.calculate();
    });

    document.addEventListener('keydown', (e) => {

        // Digits
        button.digits.forEach(digit => {
            if (e.key === digit.textContent) {
                action.typeDigit(digit.textContent);
                action.toggleClassActive(digit);
            }
        });

        // Operators / Specials
        switch (e.key) {

            case "Backspace":
                action.deleteLastDigit();
                action.toggleClassActive(button.deleteDigit);
                break;

            case "%":
                action.toPercent();
                action.toggleClassActive(button.percent);
                break;

            case ".":
                action.addDecimal();
                action.toggleClassActive(button.decimal);
                break;

            case "Enter":
                e.preventDefault();   
                if (!state.firstNum) return;

                action.toggleClassActive(button.operate);
                action.calculate();
                break;
        }
    });
}

init();