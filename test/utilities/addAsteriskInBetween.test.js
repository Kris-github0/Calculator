const { addAsteriskInBetween } = require("../../src/modules/utilities");

describe("addAsteriskInBetween", () => {
  test.each([
    { left: "(10)", right: "10", expected: "(10)*10" },
    { left: "(432)", right: "(50)", expected: "(432)*(50)" },
    { left: "434", right: "(8659*5)", expected: "434*(8659*5)" },
  ])("$left$right should return $expected", ({ left, right, expected }) => {
    expect(addAsteriskInBetween([left, right])).toBe(expected);
  });
});
