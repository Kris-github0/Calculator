/**
 * @jest-environment jsdom
 */

const { toggle } = require("../../src/modules/utilities");

describe("toggle", () => {
  test("An element with a class should have that class removed", () => {
    const element = document.createElement("div");
    element.classList.add("dummy-class");

    toggle(element, "dummy-class");
    const hasClass = element.classList.contains("dummy-class");

    expect(hasClass).toBe(false);
  });

  test("An element without a class should have that class added", () => {
    const element = document.createElement("div");

    toggle(element, "dummy-class");
    const hasClass = element.classList.contains("dummy-class");

    expect(hasClass).toBe(true);
  });
});
