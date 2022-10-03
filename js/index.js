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
