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
    inputBar.value += e.target.textContent;
    inputBar.scrollLeft = inputBar.scrollWidth;
  }
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
      return;
    }

    if (e.key === "Enter") {
      return;
    }

    inputBar.value += e.key;
    inputBar.scrollLeft = inputBar.scrollWidth;
  }
});

deleteButton.addEventListener("click", () => {
  inputBar.value = removeLastChar(inputBar.value);
  inputBar.scrollLeft = inputBar.scrollWidth;
});
