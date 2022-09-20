function prepareNextRound(result) {
    // Push the result to the 'firstNumber'
    firstNumber = result
    // Prepare for next round
    secondNumber = ''
    // formulaString becomes the result
    formulaString = result.toString()
    // Update Displays for next round
    screen.textContent = result.toString()
    formulaDisplay.textContent = formulaString
}

function toggleOperatorButton(operator) {
    operatorToggled = true
    // changes operator button background to gray upon selection
    if (operator == "+") {
        addButton.style.backgroundColor = 'lightgrey';
    } else if (operator == "-") {
        minusButton.style.backgroundColor = 'lightgrey';
    } else if (operator == "×") {
        multiplyButton.style.backgroundColor = 'lightgrey';
    } else if (operator == "÷") {
        divideButton.style.backgroundColor = 'lightgrey';
    }
};


function resetOperatorButton() {
    operatorToggled = false
    // resets all operator colors to default
    addButton.style.backgroundColor = '#e39520';
    minusButton.style.backgroundColor = '#e39520';
    multiplyButton.style.backgroundColor = '#e39520';
    divideButton.style.backgroundColor = '#e39520';
};

function resetCalculator() {
    result = null               // stores the final calculation
    firstNumber = ''            // contains the first number
    secondNumber = ''           // contains the 2nd value, and every consecutive value
    operator = null             // user selected operator
    resetOperatorButton()       // resets the operator buttons back to orange
    screen.textContent = 0      // blank input display
    formulaString = ''          // default display value
    formulaDisplay.textContent = '' // blank formula display
    previousOperator = null     // set if user is chaining the calculation with consecutive operators
    newOperator = null          // true if calculating based on the previous operator
    operatorToggled = false     // true if an operator is currently selected, prevent certain actions
    firstNumDecimal = false     // true if a user is adding decimal numbers to the output
}

function clearInput() {
    // user presses clear
    

    if (operatorToggled == true) {
        // remove input from formula
        let keep = formulaString.split(operator)[0]
        formulaString = keep + operator
        formulaDisplay.textContent = formulaString
    } else if (operatorToggled != true && secondNumber != "") {
        let keep = formulaString.split(operator)[0]
        formulaString = keep + operator
        formulaDisplay.textContent = formulaString
    } else if (secondNumber == "") {
        formulaString = ''
        formulaDisplay.textContent = formulaString
    }

    screen.textContent = 0
    secondNumber = ''
    toggleOperatorButton(operator)
}

function appendToFormulaDisplay(string) {
    formulaString = formulaString + string // refresh displays
    formulaDisplay.textContent = formulaString
}

function addDecimal() {
    // if the user completed a calculation and wants to add a decimal to result
    if (secondNumber == '' && operatorToggled == false && result != null & !firstNumber.includes('.')) {
        firstNumber += '.'
        screen.textContent = firstNumber
        appendToFormulaDisplay('.')
        firstNumDecimal = true
        console.log('b')
    // 1st number: add a zero & decimal if user did not add 0 initially
    } else if (firstNumber == '' && operator == null) { 
        firstNumber = '0.'
        screen.textContent = firstNumber
        appendToFormulaDisplay(firstNumber)
        console.log('a')
    // user entering decimal to 1st number
    } else if (firstNumber == '0' && operator == null) {
        firstNumber += '.'
        screen.textContent = firstNumber
        appendToFormulaDisplay(firstNumber)
        console.log('b')
    // 2nd number: add a zero & decimal if user did not add 0 initially
    } else if (secondNumber == '' && operator != null) { 
        secondNumber = '0.'
        screen.textContent = secondNumber
        appendToFormulaDisplay(secondNumber)
        console.log('c')
    // user entering decimal to 2nd number
    } else if (secondNumber == '0'  && operator != null) {
        secondNumber += '.'
        screen.textContent = secondNumber
        appendToFormulaDisplay(secondNumber)
        console.log('d')
    // prevent user from adding decimal if already added in 1st number
    } else if (!firstNumber.includes('.') && operator == null) { 
        firstNumber += '.'
        screen.textContent = firstNumber
        appendToFormulaDisplay('.')
        console.log('e')
    // prevent user from adding decimal if already exists in 2nd number
    } else if (!secondNumber.includes('.') && operator != null) {
        secondNumber += '.'
        screen.textContent = secondNumber
        appendToFormulaDisplay('.')
        console.log('f')
    };
};

function percentage() {
    // apply percentage to 1st number
    if (operator == null || firstNumDecimal == true) {
        firstNumber = '' + (+firstNumber / 100)
        formulaString = firstNumber
        formulaDisplay.textContent = firstNumber
        screen.textContent = firstNumber
    // apply percentage to 2nd number
    } else if (operator != null && (secondNumber != '' || secondNumber != 0)) {
        secondNumber = (+secondNumber / 100)
        screen.textContent = secondNumber

        // update string to accurately add % to formula
        let keep = formulaString.split(operator)[0]
        formulaString = keep + operator + secondNumber
        formulaDisplay.textContent = formulaString
    }
}

function operate() {
    let a = +firstNumber || 0 
    let b = +secondNumber || 0// convert str > float, if null, show 0

    if (secondNumber != '') { // user is entering the first number
        if (operator == "+") {
            result = a + b
        } else if (operator == "-") {
            result = a - b
        } else if (operator == "×") {
            result = a * b
        } else if (operator == "÷") {
            result = a / b
        }
    } else {
        result = a
    }
    
    // trim decimal places to fit screen if needed
    if (result % 1 != 0) {
        let decimals = result.toString().split('.')
        if (decimals[1].length > 5) {
            result = decimals[0] + '.' + decimals[1].slice(0,2)
        }
    }
    
    prepareNextRound(result.toString())
}

// Global storage for consecutive calculations
var result
var firstNumber
var secondNumber
var operator
var formulaString
var previousOperator
var operatorToggled
var firstNumDecimal

// operation buttons
const divideButton = document.querySelector('#divide')
const addButton = document.querySelector('#add')
const minusButton = document.querySelector('#subtract')
const multiplyButton = document.querySelector('#multiply')
const equalButton = document.querySelector('.calculation')

// additional buttons
const decimalButton = document.querySelector('#decimal')
const percentButton = document.querySelector('#percent')

// clear buttons
const allClearButton = document.querySelector('#AC')
const clearButton = document.querySelector('#C')

// screen 
const screen = document.querySelector('.input')
const formulaDisplay = document.querySelector('.formula')

// button groups
const digitButtons = document.querySelectorAll('.button-container .digit')
const operationButtons = document.querySelectorAll('.button-container .operation')

// Program
resetCalculator()
equalButton.addEventListener('click', operate)
allClearButton.addEventListener('click', resetCalculator)
clearButton.addEventListener('click', clearInput)
decimalButton.addEventListener('click', addDecimal)
percentButton.addEventListener('click', percentage)

operationButtons.forEach((operation) => {
    operation.addEventListener('click', () => {
         
            let operators = ["+", "-", "×", "÷"]

            operator = operation.textContent // New operator
            resetOperatorButton()
            toggleOperatorButton(operator)

            // if user selects 2 operations in a row, update the formula with new operator
            if (operators.includes(formulaString.slice(-1))) { 
                formulaString = formulaString.slice(0, -1) // remove the last added operation from the formulaString 
                firstNumber = formulaString
                formulaDisplay.textContent = firstNumber
            // user started with an operator
            } else if (firstNumber == '') {
                firstNumber = 0
                operate()
            // user selects a different operator without entering a number
            } else if ((secondNumber == '')) {
                prepareNextRound(firstNumber)
            // user selects a different operator from previous calculation
            } else if (previousOperator != operator) { 
                let newOperator = operator//
                operator = previousOperator
                operate()
                operator = newOperator
            // normal operation
            } else if (secondNumber != '') { 
                operate()
            }

            // global storage for next calculation
            previousOperator = operator
            firstNumDecimal = false // user is no longer inputting decimals
            appendToFormulaDisplay(operator)

    })
});


digitButtons.forEach((digit) => {
    digit.addEventListener('click', () => {
        resetOperatorButton()

        if (secondNumber == "" && operatorToggled == false && result != null) {
            resetCalculator()
            firstNumber = (firstNumber + digit.textContent)
            screen.textContent = firstNumber
            appendToFormulaDisplay(digit.textContent)
        } else if (firstNumDecimal == true) { // if user is adding decimals to an output to use in next
            firstNumber = (firstNumber + digit.textContent)
            screen.textContent = firstNumber
            appendToFormulaDisplay(digit.textContent)
            console.log('ak')
        // prevent user from spamming 0 initially
        } else if ((firstNumber == '') && digit.textContent == '0') { 
            firstNumber = ''
            formulaDisplay.textContent = 0
            console.log('a')
        // prevent user from spamming 0 during very first digit of 2nd number
        } else if (operator != null && secondNumber == '' && digit.textContent == '0') { 
            screen.textContent = '0'
            console.log('b')
        // prevent user from spamming 0 during second number
        } else if (secondNumber != '' && secondNumber.split('')[0] == 0 && digit.textContent == '0') {
            secondNumber = ''
        // input first value
        } else if (operator == null) {                          
            firstNumber = (firstNumber + digit.textContent)
            screen.textContent = firstNumber
            appendToFormulaDisplay(digit.textContent)
            console.log('d')
        // entering 2nd value or n+2..
        } else {                                                
            secondNumber = (secondNumber + digit.textContent)
            screen.textContent = secondNumber;
            appendToFormulaDisplay(digit.textContent)
            console.log('e')
        };
    });
});