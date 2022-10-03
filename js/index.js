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

function clickOutside(event, button, toggleElement) {
  return (
    !event.composedPath().includes(button) &&
    !event.composedPath().includes(toggleElement)
  );
}

function showing(element) {
  return !element.getAttribute("class").includes("hide");
}

function toggle(element, className) {
  element.classList.toggle(className);
}

document.onclick = (e) => {
  if (!e.composedPath().includes(darkModeButton.parentElement)) {
    if (
      showing(bracketButtonsContainer) &&
      clickOutside(e, bracketButton, bracketButtonsContainer)
    ) {
      toggle(bracketButtonsContainer, "hide");
    }

    if (showing(historyList) && clickOutside(e, historyButton, historyList)) {
      toggle(historyList, "hide");
    }
  }
};

/* document.onclick = (e) => {
  if (!e.composedPath().includes(darkModeButton.parentElement)) {
    if (
      !e.composedPath().includes(bracketButton) &&
      !e.composedPath().includes(bracketButtonsContainer) &&
      !bracketButtonsContainer.getAttribute("class").includes("hide")
    ) {
      bracketButtonsContainer.classList.toggle("hide");
    }

    if (
      !e.composedPath().includes(historyButton) &&
      !e.composedPath().includes(historyList) &&
      !historyList.getAttribute("class").includes("hide")
    ) {
      historyList.classList.toggle("hide");
    }
  }
}; */
