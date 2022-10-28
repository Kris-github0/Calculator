const {
  convertFromTo,
  addAsteriskInBetween,
  elementIs,
  removeLastChar,
  copyToClipboard,
  toggle,
} = require("./utilities");

function clearHistory() {
  const historyList = document.querySelector(".history-list");

  while (historyList.lastChild) {
    historyList.removeChild(historyList.lastChild);
  }
}

function alreadyInHistoryList(newExpression) {
  const expressions = document.querySelectorAll(".calculation-expression");

  for (let i = 0; i < expressions.length; i++) {
    if (newExpression === expressions[i].textContent) {
      return true;
    }
  }

  return false;
}

function notify() {
  const tooltip = document.querySelector(".tooltip");

  tooltip.classList.add("show-tooltip");

  setTimeout(hideNotification, 2500);
}

function hideNotification() {
  const tooltip = document.querySelector(".tooltip");

  tooltip.classList.remove("show-tooltip");
}

function buildLi() {
  const inputBar = document.querySelector(".input-bar");
  const formattedInputBar = buildExpressionForDisplay(inputBar.value);
  const displayBar = document.querySelector(".display-bar");
  const fragment = new DocumentFragment();
  const li = document.createElement("li");

  li.innerHTML = `<div class="history-calculation-container">
  <div class="calculation">
    <span class="calculation-expression">${formattedInputBar}</span>
    <span class="calculation-equals">=</span>
    <span class="answer">${displayBar.textContent}</span>
  </div>

  <div class="calculation-options-container">
    <button class="copy-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 111.07 122.88"
      >
        <g>
          <path
            d="M97.67,20.81L97.67,20.81l0.01,0.02c3.7,0.01,7.04,1.51,9.46,3.93c2.4,2.41,3.9,5.74,3.9,9.42h0.02v0.02v75.28 v0.01h-0.02c-0.01,3.68-1.51,7.03-3.93,9.46c-2.41,2.4-5.74,3.9-9.42,3.9v0.02h-0.02H38.48h-0.01v-0.02 c-3.69-0.01-7.04-1.5-9.46-3.93c-2.4-2.41-3.9-5.74-3.91-9.42H25.1c0-25.96,0-49.34,0-75.3v-0.01h0.02 c0.01-3.69,1.52-7.04,3.94-9.46c2.41-2.4,5.73-3.9,9.42-3.91v-0.02h0.02C58.22,20.81,77.95,20.81,97.67,20.81L97.67,20.81z M0.02,75.38L0,13.39v-0.01h0.02c0.01-3.69,1.52-7.04,3.93-9.46c2.41-2.4,5.74-3.9,9.42-3.91V0h0.02h59.19 c7.69,0,8.9,9.96,0.01,10.16H13.4h-0.02v-0.02c-0.88,0-1.68,0.37-2.27,0.97c-0.59,0.58-0.96,1.4-0.96,2.27h0.02v0.01v3.17 c0,19.61,0,39.21,0,58.81C10.17,83.63,0.02,84.09,0.02,75.38L0.02,75.38z M100.91,109.49V34.2v-0.02h0.02 c0-0.87-0.37-1.68-0.97-2.27c-0.59-0.58-1.4-0.96-2.28-0.96v0.02h-0.01H38.48h-0.02v-0.02c-0.88,0-1.68,0.38-2.27,0.97 c-0.59,0.58-0.96,1.4-0.96,2.27h0.02v0.01v75.28v0.02h-0.02c0,0.88,0.38,1.68,0.97,2.27c0.59,0.59,1.4,0.96,2.27,0.96v-0.02h0.01 h59.19h0.02v0.02c0.87,0,1.68-0.38,2.27-0.97c0.59-0.58,0.96-1.4,0.96-2.27L100.91,109.49L100.91,109.49L100.91,109.49 L100.91,109.49z"
          />
        </g>
      </svg>
    </button>
    <button class="trash-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g>
          <path
            d="M19.45,4.06H15.27v-.5a1.5,1.5,0,0,0-1.5-1.5H10.23a1.5,1.5,0,0,0-1.5,1.5v.5H4.55a.5.5,0,0,0,0,1h.72l.42,14.45a2.493,2.493,0,0,0,2.5,2.43h7.62a2.493,2.493,0,0,0,2.5-2.43l.42-14.45h.72A.5.5,0,0,0,19.45,4.06Zm-9.72-.5a.5.5,0,0,1,.5-.5h3.54a.5.5,0,0,1,.5.5v.5H9.73Zm7.58,15.92a1.5,1.5,0,0,1-1.5,1.46H8.19a1.5,1.5,0,0,1-1.5-1.46L6.26,5.06H17.74Z"
          />
          <path
            d="M8.375,8h0a.5.5,0,0,1,1,0l.25,10a.5.5,0,0,1-1,0Z"
          />
          <path
            d="M15.625,8.007a.5.5,0,0,0-1,0h0l-.25,10a.5.5,0,0,0,1,0Z"
          />
        </g>
      </svg>
    </button>
  </div>
</div>`;

  return fragment.appendChild(li);
}

let NOTIFIED = 0;

function invalidHistoryInput() {
  const HISTORY_LIST_IS_FULL = document.querySelectorAll("li").length === 100;
  const inputBar = document.querySelector(".input-bar");
  const formattedInputBar = buildExpressionForDisplay(inputBar.value);

  if (HISTORY_LIST_IS_FULL) {
    if (!NOTIFIED) {
      notify();
      NOTIFIED = 1;
    }

    return true;
  }

  NOTIFIED = 0;

  if (alreadyInHistoryList(formattedInputBar)) {
    return true;
  }
}

function addCalculationToHistoryList() {
  const historyList = document.querySelector(".history-list");
  if (invalidHistoryInput()) {
    return;
  }

  const li = buildLi();
  historyList.prepend(li);
}

function displayableCalculatorButton(element) {
  const dualBracketButton = document.getElementById("brackets-button");
  const deleteButton = document.getElementById("delete-button");
  const equalsButton = document.getElementById("equals-button");

  return (
    elementIs("calculator-button", element) &&
    !elementIs("calculator-buttons-row", element) &&
    element != equalsButton &&
    element != dualBracketButton &&
    element != deleteButton &&
    element.textContent.length === 1
  );
}

function inputIsValid(char) {
  const VALID_CHAR_LIST = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "%",
    "*",
    "x",
    "X",
    "(",
    ")",
    "-",
    "+",
    "/",
    ".",
    "Backspace",
    "Enter",
  ];

  return VALID_CHAR_LIST.includes(char);
}

function addUserInputToInputBar(char) {
  const inputBar = document.querySelector(".input-bar");

  switch (char) {
    case "Backspace":
      inputBar.value = removeLastChar(inputBar.value);
      return;

    case "/":
      inputBar.value += "÷";
      return;

    case "X":
    case "x":
    case "*":
      inputBar.value += "×";
      return;

    default:
      inputBar.value += char;
  }
}

function placeBackIntoCalculator(element) {
  const inputBar = document.querySelector(".input-bar");
  const displayBar = document.querySelector(".display-bar");
  const expression = element.firstElementChild.textContent;
  const answer = element.lastElementChild.textContent;

  inputBar.value = expression;
  displayBar.textContent = answer;
}

function preventInput(bool) {
  const inputBar = document.querySelector(".input-bar");

  inputBar.disabled = bool;
  toggleCalculatorButtons(bool);
}

function equals() {
  const inputBar = document.querySelector(".input-bar");
  const displayBar = document.querySelector(".display-bar");
  const DISPLAY_BAR_IS_EMPTY = !displayBar.textContent;
  const AUTO_COPY_BUTTON_CHECKED = document.getElementById("auto-copy").checked;

  if (DISPLAY_BAR_IS_EMPTY) {
    return;
  }

  if (AUTO_COPY_BUTTON_CHECKED) {
    copyToClipboard(displayBar.textContent);
  }

  addCalculationToHistoryList();
  toggle(inputBar, "move-up-input");
  toggle(displayBar, "move-up-display");
  preventInput(true);
}

function setInputBarToDisplayBar() {
  const inputBar = document.querySelector(".input-bar");
  const displayBar = document.querySelector(".display-bar");

  inputBar.value = displayBar.textContent;
  displayBar.textContent = "";
}

function toggleCalculatorButtons(bool) {
  const calculatorButtons = document.querySelectorAll(".calculator-button");
  const equalsButton = document.getElementById("equals-button");

  calculatorButtons.forEach((button) => {
    if (button === equalsButton) {
      return;
    }

    button.disabled = bool;
  });
}

function cancelTransition() {
  const inputBar = document.querySelector(".input-bar");
  const displayBar = document.querySelector(".display-bar");

  inputBar.classList.remove("move-up-input");
  displayBar.classList.remove("move-up-display");
}

function deleteWithoutTransition() {
  const inputBar = document.querySelector(".input-bar");
  const calculatorContainer = document.querySelector(".calculator-container");

  const DELETE_TRANSITION_ONGOING = calculatorContainer
    .getAttribute("class")
    .includes("wipeout-slider");

  if (!DELETE_TRANSITION_ONGOING) {
    inputBar.value = removeLastChar(inputBar.value);
    inputBar.scrollLeft = inputBar.scrollWidth;
  }
}

let on = 1;
let mouseIsDown = false;
let timeout;

function removeTimer() {
  clearTimeout(timeout);
}

function turnOn() {
  on = 1;
}

function resetDeleteButtonState() {
  on = 1;
  mouseIsDown = false;
}

function clearDisplay() {
  const inputBar = document.querySelector(".input-bar");
  const displayBar = document.querySelector(".display-bar");
  const calculatorContainer = document.querySelector(".calculator-container");

  calculatorContainer.classList.remove("wipeout-slider");
  inputBar.value = "";
  displayBar.textContent = "";
}

function initiateTimer() {
  const inputBar = document.querySelector(".input-bar");
  const calculatorContainer = document.querySelector(".calculator-container");

  if (!on || inputBar.value === "") {
    return;
  }

  on = 0;
  mouseIsDown = true;

  timeout = setTimeout(() => {
    if (mouseIsDown) {
      calculatorContainer.classList.add("wipeout-slider");
      document.getElementById("equals-button").disabled = true;
      preventInput(true);
    }
  }, 750);
}

function stringIsValid(string) {
  const regex = [
    /^[^0-9-(]/,
    /[.][^()×÷+-]*[.]/,
    /[(]*×[^0-9-(]/,
    /[(]*÷[^0-9-(]/,
    /[(]*[+][^0-9(]/,
    /[-][^0-9(]/,
    /[^0-9]*[.][^0-9]/,
    /[^0-9][.]/,
    /[^0-9)][%]/,
    /[%][^()×÷+-]/,
    /^0[^.%(×÷+-]/,
    /[()×÷+-]0[^%()×÷+-.]/,
    /[(×÷+-][0][0-9]+[.]/,
    /[(][)]/,
    /[^0-9%)][×÷]/,
    /[^e0-9%)][+]/,
    /[e][^+-]/,
  ];

  for (let i = 0; i < regex.length; i++) {
    if (regex[i].test(string)) {
      return false;
    }
  }

  if (!validBrackets(string)) {
    return false;
  }

  return true;
}

function validBrackets(string) {
  let counter = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === "(") {
      counter++;
    }
    if (string[i] === ")") {
      counter--;
    }
    if (counter < 0) {
      return false;
    }
  }

  return true;
}

function buildExpressionForDisplay(expression) {
  let newExpression = String(expression);

  try {
    eval(buildCalculation(expression));
  } catch (error) {
    newExpression = removeLastChar(newExpression);
    newExpression = buildExpressionForDisplay(newExpression);
  }

  return newExpression;
}

function buildCalculation(string) {
  let newString;
  newString = convertFromTo("×", "*", string);
  newString = convertFromTo("÷", "/", newString);
  newString = convertFromTo("%", "*0.01", newString);
  newString = convertFromTo(/[0-9)][(]/g, addAsteriskInBetween, newString);
  newString = convertFromTo(/[)][0-9(]/g, addAsteriskInBetween, newString);
  return newString;
}

function resize(number) {
  let i = String(number).length;
  const CHAR_LIMIT = 13;

  while (String(number.toPrecision(i)).length >= CHAR_LIMIT) {
    i--;
  }

  const FLOAT_ENDS_WITH_ZEROS = /[0-9][.][0-9]*[0]+$/;
  const E_NUMBER_WITH_TRAILING_ZEROS = /[0]+[e][-+][0-9]+$/;

  while (
    (FLOAT_ENDS_WITH_ZEROS.test(String(number.toPrecision(i))) &&
      !String(number.toPrecision(i)).includes("e")) ||
    E_NUMBER_WITH_TRAILING_ZEROS.test(String(number.toPrecision(i)))
  ) {
    i--;
  }

  return number.toPrecision(i);
}

function rewind(expression) {
  return calculation(expression.slice(0, expression.length - 1));
}

function invalidExpression(expression) {
  const NUMBER_AND_OPERATOR_ONLY = !/[0-9)][*/+-][0-9(]/.test(expression);

  if (NUMBER_AND_OPERATOR_ONLY) {
    return "";
  }

  const LastValidExpression = rewind(expression);

  return LastValidExpression;
}

function calculation(expression) {
  try {
    eval(expression);
  } catch (error) {
    return invalidExpression(expression);
  }

  const NO_OPERATOR = !/[*/+-]/.test(expression);
  const JUST_NUMBER = /^[-]*[(]*[-]*[0-9]+[.]*[0-9]*[)]*$/.test(expression);
  const JUST_E_NUMBER = /^[-]*[0-9]+[.][0-9]+e[+-][0-9]+$/.test(expression);

  if (NO_OPERATOR || JUST_NUMBER || JUST_E_NUMBER) {
    return "";
  }

  const result = eval(expression);
  const TOO_LONG = String(result).length > 12;

  if (TOO_LONG) {
    return resize(result);
  }

  return result;
}

module.exports = {
  clearHistory,
  alreadyInHistoryList,
  notify,
  buildLi,
  invalidHistoryInput,
  addCalculationToHistoryList,
  displayableCalculatorButton,
  inputIsValid,
  addUserInputToInputBar,
  placeBackIntoCalculator,
  preventInput,
  equals,
  setInputBarToDisplayBar,
  toggleCalculatorButtons,
  cancelTransition,
  deleteWithoutTransition,
  removeTimer,
  turnOn,
  resetDeleteButtonState,
  clearDisplay,
  initiateTimer,
  stringIsValid,
  validBrackets,
  buildExpressionForDisplay,
  buildCalculation,
  resize,
  rewind,
  invalidExpression,
  calculation,
};
