import { calculate, appendNumber, formatNumber } from "./calculator.js";

document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById('result'),
        expression = document.getElementById('expression'),
        numbers = document.querySelectorAll('.number:not(.equals)'),
        operators = document.querySelectorAll('.operator'),
        equals = document.querySelector('.equals'),
        clear = document.getElementById('clear'),
        ce = document.getElementById('ce'),
        historyContainer = document.getElementById('past-calc');

  let displayValue = '0';
  let storedNumber = null;
  let lastOperator = null;
  let newNumber = true;

  function updateDisplay  () {
    result.textContent = displayValue;
    expression.textContent = storedNumber ? `${formatNumber(storedNumber)} ${lastOperator}` : '';

  }

  numbers.forEach(num => {
      num.addEventListener('click', () => {
        const digit = num.id;
        console.log(digit);

        if(newNumber) {
          displayValue = digit === '.' ? '0.' : digit;
          newNumber = false;
        } else {
          displayValue = appendNumber(displayValue, digit);
        }
        updateDisplay();
      })
  });

  operators.forEach(op => {
    op.addEventListener('click', () => {
      const operator = op.id;
      if (storedNumber && !newNumber) {
       
        const result = calculate(storedNumber, displayValue, lastOperator);
        if (result !== 'Error') {
            storedNumber = result;
            displayValue = formatNumber(result);
        } else {
            displayValue = 'Error';
            storedNumber = null;
        }
    } else {
        storedNumber = displayValue;
    }

    lastOperator = operator;
    newNumber = true;
    updateDisplay();
    })
  })

  equals.addEventListener('click', () => {
    if (storedNumber && lastOperator && !newNumber) {
        const res = calculate(storedNumber, displayValue, lastOperator);
        const fullExpression = `${formatNumber(storedNumber)} ${lastOperator} ${formatNumber(displayValue)} =`;
        postNewExpression(storedNumber, displayValue, lastOperator, res);
        getPastCalcs();
        displayValue = formatNumber(res);
        storedNumber = null;
        lastOperator = null;
        newNumber = true;
        
        expression.textContent = fullExpression;
        result.textContent = displayValue;

    }
  });

  clear.addEventListener('click', () => {
    displayValue = '0';
    storedNumber = null;
    lastOperator = null;
    newNumber = true;
    updateDisplay();
  });

  ce.addEventListener('click', () => {
    displayValue = '0';
    newNumber = true;
    updateDisplay();
  });


const getPastCalcs = async () => {
  // make a GET request to the server
  const response = await fetch("/api/data");
  const data = await response.json(); // get the response data
  displayPastCalcs(data); // display the data
  // getPastCalcs(); // update the past calcs
};

const postNewExpression = async (num1, num2, operator, result) => {
  // make a POST request to the server
  const response = await fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      num1: num1,
      num2: num2,
      operation: operator,
      result: result,
    }),
  });

    // get the response data
    const data = await response.json();
  
    return data;
  
};

const displayPastCalcs = (data) => {
  
  historyContainer.innerHTML = "";

  if (!data || data.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'history-item';
      emptyMessage.textContent = 'No calculations yet';
      historyContainer.appendChild(emptyMessage);
      return;
  }

  data.forEach((calc) => {
      if (!calc.num1 || !calc.num2 || !calc.operation || !calc.result) {
          return;
      }

      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';

      const expression = document.createElement('div');
      expression.className = 'history-expression';
      expression.textContent = `${calc.num1} ${calc.operation} ${calc.num2} =`;

      const result = document.createElement('div');
      result.className = 'history-result';
      result.textContent = `${calc.result}`;

      historyItem.appendChild(expression);
      historyItem.appendChild(result);
      historyContainer.appendChild(historyItem);
  });

  historyContainer.scrollTop = historyContainer.scrollHeight;
};

getPastCalcs();
updateDisplay();

})
