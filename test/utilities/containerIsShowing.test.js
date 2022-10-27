/**
 * @jest-environment jsdom
 */

const { containerIsShowing } = require("../../src/modules/utilities");

describe("containerIsShowing", () => {
  test("A container without a hide class should return true", () => {
    const container = document.createElement("div");
    container.classList.add("dummy-class");

    const showing = containerIsShowing(container);

    expect(showing).toBe(true);
  });

  test("A container with a hide class should return false", () => {
    const container = document.createElement("div");
    container.classList.add("dummy-class");
    container.classList.add("hide");

    const showing = containerIsShowing(container);

    expect(showing).toBe(false);
  });
});
