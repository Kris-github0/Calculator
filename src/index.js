import style from "./style.css";
const _ = require("./modules/utilities");
const calc = require("./modules/calculator");

const darkModeButton = document.getElementById("dark-mode");
const HTML = document.querySelector("html");

darkModeButton.addEventListener("click", () => _.toggle(HTML, "dark"));

const historyButton = document.getElementById("history-button");
const historyContainer = document.getElementById("history-list-container");

historyButton.addEventListener("click", () =>
  _.toggle(historyContainer, "hide")
);

const dualBracketButton = document.getElementById("brackets-button");
const bracketButtonsContainer = document.getElementById("brackets-container");

dualBracketButton.addEventListener("click", () =>
  _.toggle(bracketButtonsContainer, "hide")
);

bracketButtonsContainer.addEventListener("click", (e) => {
  if (_.elementIs("calculator-button", e.target)) {
    _.toggle(bracketButtonsContainer, "hide");
  }
});

document.onclick = (e) => {
  if (_.clickWasOutside(darkModeButton.parentElement, e)) {
    if (
      _.containerIsShowing(bracketButtonsContainer) &&
      _.clickWasOutside(dualBracketButton, e) &&
      _.clickWasOutside(bracketButtonsContainer, e)
    ) {
      _.toggle(bracketButtonsContainer, "hide");
    }

    if (
      _.containerIsShowing(historyContainer) &&
      _.clickWasOutside(historyButton, e) &&
      _.clickWasOutside(historyContainer, e)
    ) {
      _.toggle(historyContainer, "hide");
    }
  }
};

document.addEventListener("mouseup", (e) => {
  if (_.elementIs("calculator-button", e.target)) {
    inputBar.focus();
  }
});

document.addEventListener("keydown", (e) => {
  const CALCULATOR_BUTTON_FOCUSED = _.elementIs("calculator-button", e.target);
  const HISTORY_BUTTON_FOCUSED = historyButton === document.activeElement;

  if (
    !calc.inputIsValid(e.key) ||
    inputBar.disabled ||
    _.containerIsShowing(historyContainer)
  ) {
    return;
  }

  if (e.key === "Enter") {
    if (CALCULATOR_BUTTON_FOCUSED || HISTORY_BUTTON_FOCUSED) {
      return;
    }

    calc.equals();
    return;
  }

  calc.addUserInputToInputBar(e.key);

  if (!calc.stringIsValid(inputBar.value)) {
    inputBar.value = _.removeLastChar(inputBar.value);
  }
  inputBar.scrollLeft = inputBar.scrollWidth;

  calc.updateDisplayBar();
});

const inputBar = document.querySelector(".input-bar");
const displayBar = document.querySelector(".display-bar");
const calculatorButtonsContainer =
  document.getElementById("calculator-buttons");
const deleteButton = document.getElementById("delete-button");
const equalsButton = document.getElementById("equals-button");

calculatorButtonsContainer.addEventListener("click", (e) => {
  const GUTTER = _.elementIs("calculator-buttons-row", e.target);
  const TARGET_DOESNT_CHANGE_EXPRESSION =
    e.target === dualBracketButton || e.target === equalsButton || GUTTER;

  if (TARGET_DOESNT_CHANGE_EXPRESSION) {
    return;
  }

  if (calc.displayableCalculatorButton(e.target)) {
    calc.addUserInputToInputBar(e.target.textContent);

    if (!calc.stringIsValid(inputBar.value)) {
      inputBar.value = _.removeLastChar(inputBar.value);
    }
    inputBar.scrollLeft = inputBar.scrollWidth;
  }

  calc.updateDisplayBar();
});

const clearHistoryButton = document.getElementById("main-trash-button");
const historyList = document.querySelector(".history-list");

clearHistoryButton.addEventListener("click", calc.clearHistory);

historyList.addEventListener("click", (e) => {
  if (_.elementIs("calculation", e.target.parentElement)) {
    calc.placeBackIntoCalculator(e.target.parentElement);
    _.toggle(historyContainer, "hide");
    return;
  }

  if (_.elementIs("copy-button", e.target)) {
    const li = _.getLi(e.target);
    const answer = _.getAnswer(li);

    _.copyToClipboard(answer);
    return;
  }

  if (_.elementIs("trash-button", e.target)) {
    const li = _.getLi(e.target);

    historyList.removeChild(li);
    return;
  }
});

const calculationDisplayContainer = document.querySelector(
  ".calculation-display-container"
);

calculationDisplayContainer.addEventListener("transitionend", (e) => {
  const MOVE_UP_TRANSITION_END = e.propertyName === "font-size";

  if (MOVE_UP_TRANSITION_END) {
    _.toggle(inputBar, "move-up-input");
    _.toggle(displayBar, "move-up-display");
    calc.setInputBarToDisplayBar();
    calc.preventInput(false);
  }
});

calculationDisplayContainer.addEventListener("transitioncancel", (e) => {
  const MOVE_UP_TRANSITION_CANCELLED = e.propertyName === "font-size";

  if (MOVE_UP_TRANSITION_CANCELLED) {
    calc.cancelTransition();
    calc.setInputBarToDisplayBar();

    calc.preventInput(false);
  }
});

equalsButton.addEventListener("click", calc.equals);

deleteButton.addEventListener("click", calc.deleteWithoutTransition);
deleteButton.addEventListener("blur", calc.resetDeleteButtonState);

deleteButton.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    calc.initiateTimer();
  }
});

deleteButton.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    calc.resetDeleteButtonState();
    calc.removeTimer();
  }
});

deleteButton.addEventListener("mousedown", calc.initiateTimer);

deleteButton.addEventListener("mouseup", () => {
  calc.resetDeleteButtonState();
  calc.removeTimer();
});

document.addEventListener("click", (e) => {
  if (e.target !== deleteButton) {
    calc.resetDeleteButtonState();
  }
});

const calculatorContainer = document.querySelector(".calculator-container");

calculatorContainer.addEventListener("transitionend", (e) => {
  if (e.target !== calculatorContainer) {
    return;
  }

  const FIRST_HALF_ENDED = _.elementIs("wipeout-slider", calculatorContainer);
  const SECOND_HALF_ENDED = !FIRST_HALF_ENDED;

  if (FIRST_HALF_ENDED) {
    calc.clearDisplay();
  }

  if (SECOND_HALF_ENDED) {
    calc.preventInput(false);
    equalsButton.disabled = false;
    calc.turnOn();
  }
});
