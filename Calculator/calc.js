//Name: Destiney Allen-Suarez
//Professor: Gavin Stuart
//Class:SD 230
//Date: 11/20/24 
//calc.js

// Variables to track current input, calculation history, and result
let currentInput = "0";
let history = [];
let result = null;

// Accessing the display and history elements in the DOM
const display = document.getElementById('display');
const historyDiv = document.getElementById('history');

// Function to add input (numbers and operators) to the current input
function addToInput(value) {
    // If current input is "0", replace it with the new value unless it's a decimal point
    if (currentInput === "0" && value !== '.') {
        currentInput = value.toString();
    } else {
        currentInput += value;
    }
    updateDisplay();
}

// Function to toggle the sign of the current input (+/-)
function toggleSign() {
    // If the number is negative, remove the minus sign, otherwise add it
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.slice(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

// Function to clear the current input (reset to "0")
function clearInput() {
    currentInput = "0";
    updateDisplay();
}

// Function to calculate the result of the current input expression
function calculateResult() {
    try {
        // Check for division by zero and other errors before calculating
        if (currentInput.includes('/0')) {
            currentInput = "Error: Division by zero";
        } else {
            // Evaluate the expression using the Function constructor safely
            result = Function('return ' + currentInput)();
            addHistory(currentInput + " = " + result);
            currentInput = result.toString(); // Update current input with result
        }
        updateDisplay();
    } catch (error) {
        // Handle invalid expressions (e.g., syntax errors)
        currentInput = "Error";
        updateDisplay();
    }
}

// Function to add calculations to history (keeps the last 5 calculations)
function addHistory(entry) {
    history.push(entry);
    if (history.length > 5) {
        history.shift(); // Keeps history to a maximum of 5 entries
    }
    updateHistory();
}

// Function to update the history display
function updateHistory() {
    historyDiv.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}

// Function to update the display with the current input or result
function updateDisplay() {
    display.textContent = currentInput;
}

// Function to clear the history of calculations
function clearHistory() {
    history = [];
    updateHistory();
}
