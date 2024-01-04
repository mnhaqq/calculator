let num1, num2, operator;

let mapOperators = {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide
}


function operate(operator, num1, num2) {
    return mapOperators[operator](num1, num2);
}

function add(a, b) {return a + b;}

function subtract(a, b) {return a - b;}

function multiply(a, b) {return a * b;}

function divide(a, b) {return a / b};