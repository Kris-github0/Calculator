const darkModeButton = document.getElementById("dark-mode");
const HTML = document.querySelector("html");

darkModeButton.addEventListener("click", () => {
  HTML.classList.toggle("dark");
});
