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

function equals() {
  const DISPLAY_BAR_NOT_EMPTY = displayBar.textContent;

  if (DISPLAY_BAR_NOT_EMPTY) {
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
  inputBar.value = removeLastChar(inputBar.value);
  inputBar.scrollLeft = inputBar.scrollWidth;
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
