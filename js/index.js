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

function isCalculatorButton(element) {
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
  if (isCalculatorButton(e.target)) {
    if (e.target.textContent === "x") {
      inputBar.value += "×";
      validString(inputBar.value);
      inputBar.scrollLeft = inputBar.scrollWidth;
      return;
    }

    if (e.target.textContent === "/") {
      inputBar.value += "÷";
      validString(inputBar.value);
      inputBar.scrollLeft = inputBar.scrollWidth;
      return;
    }

    inputBar.value += e.target.textContent;
    validString(inputBar.value);
    inputBar.scrollLeft = inputBar.scrollWidth;
  }

  displayBar.textContent = calculation(buildCalculationString(inputBar.value));
});

function removeLastChar(string) {
  return string.slice(0, string.length - 1);
}

function isValidChar(char) {
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

inputBar.addEventListener("keydown", (e) => {
  if (isValidChar(e.key)) {
    if (e.key === "Backspace") {
      inputBar.value = removeLastChar(inputBar.value);
      inputBar.scrollLeft = inputBar.scrollWidth;

      displayBar.textContent = calculation(
        buildCalculationString(inputBar.value)
      );
      return;
    }

    if (e.key === "Enter") {
      return;
    }

    if (e.key === "/") {
      inputBar.value += "÷";
      validString(inputBar.value);
      inputBar.scrollLeft = inputBar.scrollWidth;
      return;
    }

    if (e.key === "X" || e.key === "x" || e.key === "*") {
      inputBar.value += "×";
      validString(inputBar.value);
      inputBar.scrollLeft = inputBar.scrollWidth;
      return;
    }

    inputBar.value += e.key;
    validString(inputBar.value);
    inputBar.scrollLeft = inputBar.scrollWidth;

    displayBar.textContent = calculation(
      buildCalculationString(inputBar.value)
    );
  }
});

deleteButton.addEventListener("click", () => {
  inputBar.value = removeLastChar(inputBar.value);
  inputBar.scrollLeft = inputBar.scrollWidth;
});

function validString(string) {
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
    /[^0-9%)][+×÷]/,
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
  let newString = convertFromTo("×", "*", string);
  newString = convertFromTo("÷", "/", newString);
  newString = convertFromTo("%", "*0.01", newString);
  newString = convertFromTo(/[0-9)][(]/g, inBetween, newString);
  newString = convertFromTo(/[)][0-9(]/g, inBetween, newString);
  return newString;
}

function inBetween(match) {
  return match[0] + "*" + match[1];
}

function calculation(string) {
  if (String(eval(string)).length > 12) {
    return eval(string).toPrecision(6);
  }
  return eval(string);
}
