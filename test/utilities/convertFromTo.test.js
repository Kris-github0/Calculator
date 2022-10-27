const { convertFromTo } = require("../../src/modules/utilities");

describe("convertFromTo", () => {
  describe("All instances of a character set should be converted.", () => {
    test.each([
      { from: "×", to: "*", expression: "3×3", expected: "3*3" },
      { from: "÷", to: "/", expression: "10÷2", expected: "10/2" },
      { from: "%", to: "*0.01", expression: "50%", expected: "50*0.01" },
    ])(
      "$expression should return $expected",
      ({ from, to, expression, expected }) => {
        expect(convertFromTo(from, to, expression)).toBe(expected);
      }
    );
  });

  describe("If a character set isn't present nothing should change.", () => {
    test.each([
      { from: "×", to: "*", expression: "5+20" },
      { from: "÷", to: "/", expression: "4-3" },
      { from: "%", to: "*0.01", expression: "103(34)" },
    ])("$expression should return $expression", ({ from, to, expression }) => {
      expect(convertFromTo(from, to, expression)).toBe(expression);
    });
  });
});
