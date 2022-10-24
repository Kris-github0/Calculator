function clickWasOutside(element, event) {
  return !event.composedPath().includes(element);
}

function containerIsShowing(container) {
  return !container.getAttribute("class").includes("hide");
}

function toggle(element, className) {
  element.classList.toggle(className);
}

function removeLastChar(string) {
  return string.slice(0, string.length - 1);
}

function elementIs(type, element) {
  return element.hasAttribute("class") && element.classList.contains(type);
}

function copyToClipboard(answer) {
  navigator.clipboard.writeText(answer);
}

function getLi(element) {
  return element.parentElement.parentElement.parentElement;
}

function getAnswer(li) {
  return li.firstElementChild.firstElementChild.lastElementChild.textContent;
}

function convertFromTo(from, to, string) {
  return string.replaceAll(from, to);
}

function addAsteriskInBetween(match) {
  return match[0] + "*" + match[1];
}

module.exports = {
  clickWasOutside,
  containerIsShowing,
  toggle,
  removeLastChar,
  elementIs,
  copyToClipboard,
  getLi,
  getAnswer,
  convertFromTo,
  addAsteriskInBetween,
};
