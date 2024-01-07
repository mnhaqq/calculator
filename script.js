let num1, num2, operator;
let displayContent = "";
let operandStack = [];
let currentOperator;
let operand;

const mapOperators = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide,
};

const displayArea = document.querySelector(".display");
const buttons = document.querySelectorAll(".num");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".del");

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayContent === "" && button.textContent === "-") {
            displayContent += button.textContent
            displayArea.textContent = displayContent;
        } else if (button.textContent in mapOperators || button.textContent === "=") {
            if (button.textContent in mapOperators) currentOperator = button.textContent;
            displayArea.textContent = "";

            if (!isNaN(displayContent) && !isNaN(parseFloat(displayContent))) {
                operand = displayContent;
                operandStack.push(operand);
            }
            
            if (!(currentOperator in mapOperators)) {
                displayArea.textContent = "Error!";
                return;
            };
            if (operandStack.length == 2) {
                let b = parseFloat(operandStack.pop());
                let a = parseFloat(operandStack.pop());
                let ans = operate(currentOperator, a, b);
                if (ans === "Error!") {
                    displayArea.textContent = ans;
                    return;
                } 
                operandStack.push(ans);
                if (String(ans).length > 3) displayArea.textContent = ans.toFixed(2);
                else displayArea.textContent = ans;
            }

            if (button.textContent === "=") currentOperator = "";
            displayContent = "";
        } else {
            displayContent += button.textContent
            displayArea.textContent = displayContent;
        }
    });
});

clearButton.addEventListener('click', resetCalculator);
deleteButton.addEventListener('click', deleteChar);

function deleteChar() {
    if (displayContent.length === 0) return;
    displayContent = displayContent.slice(0, displayContent.length - 1);
    displayArea.textContent = displayContent;
}
function resetCalculator() {
    operandStack = [];
    displayContent = "";
    currentOperator = "";
    displayArea.textContent = "";
}

function operate(operator, num1, num2) {
    return mapOperators[operator](num1, num2);
}

function add(a, b) {return a + b;}

function subtract(a, b) {return a - b;}

function multiply(a, b) {return a * b;}

function divide(a, b) {
    if (b === 0) return "Error!";
    return a / b;
}