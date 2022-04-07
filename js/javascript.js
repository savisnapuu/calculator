const buttons = document.querySelectorAll(".number-button");
const displayMain = document.getElementById("display-main");
const displayOperation = document.getElementById("display-operation");
const displayOperator = document.getElementById("display-operator");
const operatorButtons = document.querySelectorAll(".operator-button");
const equals = document.getElementById("operator-equal");
const clear = document.getElementById("clear-all");
const clearOne = document.getElementById("clear-one");
const posNeg = document.getElementById("number-posneg");
let a, b, sum;
let operator = "";
let currentOperand = "";
let previousOperand = "";
let equationCompleted = false
let neg = false;

function appendNumber(number){
    if(number === "." && currentOperand.includes(".")) return;
    currentOperand = currentOperand + number
}

function updateDisplay(){
    displayMain.textContent = currentOperand;
}

function updateDisplayOperate(){
    previousOperand = sum;
    currentOperand = ''
    displayMain.textContent = ''
    displayOperation.textContent = `${sum}`;
}

function equationEquals(){
    displayOperator.textContent = ""
    displayMain.textContent = ""
    a = Number(previousOperand);
    b = Number(currentOperand);
    operate(a, b, operator);
    displayOperation.textContent = `${a} ${operator} ${b} = ${sum}`;
    neg = false;
    equationCompleted = true
}

function clearOneNumber(){
    if(equationCompleted === true) return
    currentOperand = currentOperand.substring(0, currentOperand.length - 1)
    updateDisplay()
}

function clearAll(){
    currentOperand = "";
    previousOperand = "";
    displayOperation.textContent = "";
    displayMain.textContent = "";
    displayOperator.textContent = ""
    neg = false;
    equationCompleted = false
}

function operation(){
    if(currentOperand === "") return;
    if(previousOperand !== ""){
        a = Number(previousOperand);
        b = Number(currentOperand);
        operate(a, b, operator);
        updateDisplayOperate();
    } else if(previousOperand === ""){
        displayOperation.textContent = `${currentOperand}`;
        previousOperand = currentOperand;
        currentOperand = "";
        displayMain.textContent = "";
    }
}

function posNegF(){
    if(currentOperand === "" || equationCompleted === true) return;
    if(neg === false){
        currentOperand = `${-currentOperand}`
        displayMain.textContent = `${currentOperand}`
        neg = true;
    } else {
        displayMain.textContent = displayMain.textContent.replace("-", "");
        currentOperand = currentOperand.replace("-", "")
        neg = false;
    }
}

function operate(a, b, operator){
    switch(operator){
        case "+":
            sum = a + b;
            break;
        case "-":
            sum =  a - b;
            break;
        case "*":
            sum =  a * b;
            break;
        case "/":
            if(b === 0){
                throw "Can't divide by 0!"
            } else {
                sum =  a / b;
                break;
            } 
    }return sum;
}

clearOne.addEventListener("click", clearOneNumber)
posNeg.addEventListener("click", posNegF)
equals.addEventListener("click", equationEquals)
clear.addEventListener("click", clearAll)
buttons.forEach(button => button.addEventListener("click", (e) => {
    if(equationCompleted === true){
        clearAll()
    }
    appendNumber(e.target.innerHTML);
    updateDisplay();
}))

operatorButtons.forEach(button => button.addEventListener("click", (e) => {
    operation()
    neg, equationCompleted = false;
    operator = e.target.textContent;
    displayOperator.textContent = ` ${operator}`
}))