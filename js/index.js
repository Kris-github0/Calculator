const darkModeButton = document.getElementById("dark-mode");
const HTML = document.querySelector("html");

darkModeButton.addEventListener("click", () => {
  toggle(HTML, "dark");
});

const historyButton = document.getElementById("history-button");
const historyList = document.getElementById("history-list-container");

historyButton.addEventListener("click", () => {
  toggle(historyList, "hide");
});

const bracketButton = document.getElementById("brackets-button");
const bracketButtonsContainer = document.getElementById("brackets-container");

bracketButton.addEventListener("click", () => {
  toggle(bracketButtonsContainer, "hide");
});

bracketButtonsContainer.addEventListener("click", (e) => {
  if (e.target.getAttribute("class").includes("calculator-button")) {
    toggle(bracketButtonsContainer, "hide");
  }
});

function clickedOutside(element, event) {
  return !event.composedPath().includes(element);
}

function showing(element) {
  return !element.getAttribute("class").includes("hide");
}

function toggle(element, className) {
  element.classList.toggle(className);
}

document.onclick = (e) => {
  if (clickedOutside(darkModeButton.parentElement, e)) {
    if (
      showing(bracketButtonsContainer) &&
      clickedOutside(bracketButton, e) &&
      clickedOutside(bracketButtonsContainer, e)
    ) {
      toggle(bracketButtonsContainer, "hide");
    }

    if (
      showing(historyList) &&
      clickedOutside(historyButton, e) &&
      clickedOutside(historyList, e)
    ) {
      toggle(historyList, "hide");
    }
  }
};

const inputBar = document.querySelector(".input-bar");
const displayBar = document.querySelector(".display-bar");
const calculatorButtonsContainer =
  document.getElementById("calculator-buttons");

const deleteButton = document.getElementById("delete-button");
const equalsButton = document.getElementById("equals-button");

function displayableCalculatorButton(element) {
  return (
    element.getAttribute("class").includes("calculator-button") &&
    !element.getAttribute("class").includes("calculator-buttons-row") &&
    element != equalsButton &&
    element != bracketButton &&
    element != deleteButton &&
    element.textContent.length === 1
  );
}

calculatorButtonsContainer.addEventListener("click", (e) => {
  if (e.target === bracketButton || e.target === equalsButton) {
    return;
  }

  if (displayableCalculatorButton(e.target)) {
    if (e.target.textContent === "x") {
      inputBar.value += "×";
    } else if (e.target.textContent === "/") {
      inputBar.value += "÷";
    } else {
      inputBar.value += e.target.textContent;
    }

    makeValidString(inputBar.value);
    inputBar.scrollLeft = inputBar.scrollWidth;
  }

  displayBar.textContent = calculation(buildCalculationString(inputBar.value));
});

function removeLastChar(string) {
  return string.slice(0, string.length - 1);
}

function validChar(char) {
  return [
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
  ].includes(char);
}

const clearHistoryButton = document.getElementById("main-trash-button");
const historyUl = document.querySelector(".history-list");

function clearHistory() {
  while (historyUl.lastChild) {
    historyUl.removeChild(historyUl.lastChild);
  }
}

clearHistoryButton.addEventListener("click", () => {
  clearHistory();
});

document.addEventListener("mouseup", (e) => {
  if (
    e.target.hasAttribute("class") &&
    e.target.getAttribute("class").includes("calculator-button")
  ) {
    inputBar.focus();
  }
});

document.addEventListener("keydown", (e) => {
  const HISTORY_LIST_VISIBLE = !historyList
    .getAttribute("class")
    .includes("hide");

  const CALCULATOR_BUTTON_FOCUSED =
    e.target.hasAttribute("class") &&
    e.target.getAttribute("class").includes("calculator-button");

  const HISTORY_BUTTON_FOCUSED = historyButton === document.activeElement;

  if (!validChar(e.key) || inputBar.disabled || HISTORY_LIST_VISIBLE) {
    return;
  }

  if (e.key === "Backspace") {
    inputBar.value = removeLastChar(inputBar.value);
  } else if (e.key === "Enter") {
    if (CALCULATOR_BUTTON_FOCUSED || HISTORY_BUTTON_FOCUSED) {
      return;
    }
    equals();
    return;
  } else if (e.key === "/") {
    inputBar.value += "÷";
  } else if (e.key === "X" || e.key === "x" || e.key === "*") {
    inputBar.value += "×";
  } else {
    inputBar.value += e.key;
  }

  makeValidString(inputBar.value);
  inputBar.scrollLeft = inputBar.scrollWidth;

  displayBar.textContent = calculation(buildCalculationString(inputBar.value));
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

function alreadyInHistoryList(newExpression) {
  const expressions = document.querySelectorAll(".calculation-expression");

  for (let i = 0; i < expressions.length; i++) {
    if (newExpression == expressions[i].textContent) {
      return true;
    }
  }

  return false;
}

function prepareExpressionForDisplay(expression) {
  let newExpression = String(expression);

  try {
    eval(buildCalculationString(expression));
  } catch (error) {
    newExpression = prepareExpressionForDisplay(removeLastChar(newExpression));
  }

  return newExpression;
}

let NOT_NOTIFIED = 1;
function notify() {
  NOT_NOTIFIED = 0;
  const tooltip = document.querySelector(".tooltip");

  tooltip.classList.add("show-tooltip");

  setTimeout(function hideNotification() {
    tooltip.classList.remove("show-tooltip");
  }, 2500);
}

function buildLi() {
  const validInputBar = prepareExpressionForDisplay(inputBar.value);

  const fragment = new DocumentFragment();

  const li = document.createElement("li");

  li.innerHTML = `<div class="history-calculation-container">
  <div class="calculation">
    <span class="calculation-expression">${validInputBar}</span>
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

function invalidHistoryInput() {
  const HISTORY_LIST_FULL = document.querySelectorAll("li").length === 100;

  if (HISTORY_LIST_FULL) {
    if (NOT_NOTIFIED) {
      notify();
    }

    return true;
  }

  NOT_NOTIFIED = 1;

  if (alreadyInHistoryList(inputBar.value)) {
    return true;
  }
}

function addToHistoryList() {
  if (invalidHistoryInput()) {
    return;
  }
  const li = buildLi();
  historyUl.prepend(li);
}

function elementIs(type, element) {
  return element.hasAttribute("class") && element.classList.contains(type);
}

function getLi(element) {
  return element.parentElement.parentElement.parentElement;
}

function getAnswer(li) {
  return li.firstElementChild.firstElementChild.lastElementChild.textContent;
}

function placeBackIntoCalculator(element) {
  const expression = element.firstElementChild.textContent;
  const answer = element.lastElementChild.textContent;

  inputBar.value = expression;
  displayBar.textContent = answer;
}

historyUl.addEventListener("click", (e) => {
  if (elementIs("copy-button", e.target)) {
    const li = getLi(e.target);
    const answer = getAnswer(li);

    copyToClipboard(answer);
  }

  if (elementIs("trash-button", e.target)) {
    const li = getLi(e.target);

    historyUl.removeChild(li);
  }

  if (elementIs("calculation", e.target.parentElement)) {
    placeBackIntoCalculator(e.target.parentElement);
    toggle(historyList, "hide");
  }
});

function equals() {
  const DISPLAY_BAR_NOT_EMPTY = displayBar.textContent;
  const AUTO_COPY_BUTTON_CHECKED = document.getElementById("auto-copy").checked;

  if (DISPLAY_BAR_NOT_EMPTY) {
    if (AUTO_COPY_BUTTON_CHECKED) {
      copyToClipboard(displayBar.textContent);
    }
    addToHistoryList();
    toggle(inputBar, "move-up-input");
    toggle(displayBar, "move-up-display");
    inputBar.disabled = true;
    toggleCalculatorButtons(true);
  }
}

function switchOver() {
  inputBar.value = displayBar.textContent;
  displayBar.textContent = "";
}

const calculatorButtons = document.querySelectorAll(".calculator-button");

function toggleCalculatorButtons(bool) {
  calculatorButtons.forEach((button) => {
    if (button === equalsButton) {
      return;
    }

    button.disabled = bool;
  });
}

const calculationDisplayContainer = document.querySelector(
  ".calculation-display-container"
);

calculationDisplayContainer.addEventListener("transitionend", (e) => {
  const ANY_TRANSITION_END = e.propertyName === "font-size";

  if (ANY_TRANSITION_END) {
    toggle(inputBar, "move-up-input");
    toggle(displayBar, "move-up-display");

    switchOver();

    inputBar.disabled = false;
    toggleCalculatorButtons(false);
  }
});

function cancelTransition() {
  inputBar.classList.remove("move-up-input");
  displayBar.classList.remove("move-up-display");
}

calculationDisplayContainer.addEventListener("transitioncancel", (e) => {
  const ANY_TRANSITION_CANCELLED = e.propertyName === "font-size";

  if (ANY_TRANSITION_CANCELLED) {
    cancelTransition();
    switchOver();

    inputBar.disabled = false;
    toggleCalculatorButtons(false);
  }
});

equalsButton.addEventListener("click", equals);

deleteButton.addEventListener("click", () => {
  if (!calculatorContainer.getAttribute("class").includes("wipeout-slider")) {
    inputBar.value = removeLastChar(inputBar.value);
    inputBar.scrollLeft = inputBar.scrollWidth;
  }
});

let goAgain = 1;
let mouseIsDown = false;
let timeout;

function deleteButtonResetState() {
  goAgain = 1;
  mouseIsDown = false;
}

document.addEventListener("click", (e) => {
  if (e.target !== deleteButton) {
    deleteButtonResetState();
  }
});

deleteButton.addEventListener("blur", () => {
  deleteButtonResetState();
});

deleteButton.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    clearInput();
  }
});

deleteButton.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    deleteButtonResetState();
    clearTimeout(timeout);
  }
});

const calculatorContainer = document.querySelector(".calculator-container");

calculatorContainer.addEventListener("transitionend", (e) => {
  if (e.target !== calculatorContainer) {
    return;
  }

  const FIRST_HALF_ENDED = calculatorContainer
    .getAttribute("class")
    .includes("wipeout-slider");
  const SECOND_HALF_ENDED = !FIRST_HALF_ENDED;

  if (FIRST_HALF_ENDED) {
    calculatorContainer.classList.remove("wipeout-slider");
    inputBar.value = "";
    displayBar.textContent = "";
  }

  if (SECOND_HALF_ENDED) {
    inputBar.disabled = false;
    toggleCalculatorButtons(false);
    goAgain = 1;
  }
});

function clearInput() {
  if (!goAgain || inputBar.value === "") {
    return;
  }

  goAgain = 0;
  mouseIsDown = true;

  timeout = setTimeout(() => {
    if (mouseIsDown) {
      calculatorContainer.classList.add("wipeout-slider");
      inputBar.disabled = true;
      toggleCalculatorButtons(true);
    }
  }, 750);
}

deleteButton.addEventListener("mousedown", () => {
  clearInput();
});

deleteButton.addEventListener("mouseup", () => {
  deleteButtonResetState();
  clearTimeout(timeout);
});

function makeValidString(string) {
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
      inputBar.value = removeLastChar(inputBar.value);
      return;
    }
  }

  let a = 0;
  for (let i = 0; i < inputBar.value.length; i++) {
    if (inputBar.value[i] === "(") {
      a++;
    }
    if (inputBar.value[i] === ")") {
      a--;
    }

    if (a < 0) {
      inputBar.value = removeLastChar(inputBar.value);
      return;
    }
  }
}

function convertFromTo(from, to, string) {
  return string.replaceAll(from, to);
}

function buildCalculationString(string) {
  let newString;
  newString = convertFromTo("×", "*", string);
  newString = convertFromTo("÷", "/", newString);
  newString = convertFromTo("%", "*0.01", newString);
  newString = convertFromTo(/[0-9)][(]/g, addAsteriskInBetween, newString);
  newString = convertFromTo(/[)][0-9(]/g, addAsteriskInBetween, newString);
  return newString;
}

function addAsteriskInBetween(match) {
  return match[0] + "*" + match[1];
}

function resize(number) {
  let i = String(number).length;

  while (String(number.toPrecision(i)).length >= 13) {
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
