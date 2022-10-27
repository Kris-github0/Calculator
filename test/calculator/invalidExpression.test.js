const { invalidExpression } = require("../../src/modules/calculator");

describe("invalidExpression", () => {
  describe("An invalid expression should return the calculated result of the last valid expression.", () => {
    test.each([
      { expression: "12+2+", result: 14 },
      { expression: "3+3+3*-", result: 9 },
      { expression: "42*0.01/", result: 0.42 },
      { expression: "(3)*(41)((((", result: 123 },
      { expression: "432*2*-2(6/5", result: -1728 },
      { expression: "2+1-232333.", result: -232330 },
      { expression: "545/4+32-4432*(4)*", result: -17559.75 },
      { expression: "1+3(((((((((((((((((((((((((((((((2", result: 4 },
    ])("$expression should return $result", ({ expression, result }) => {
      expect(invalidExpression(expression)).toBe(result);
    });
  });
});
