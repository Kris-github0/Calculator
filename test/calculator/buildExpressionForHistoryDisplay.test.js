const {
  buildExpressionForHistoryDisplay,
} = require("../../src/modules/calculator");

describe("buildExpressionForHistoryDisplay", () => {
  describe("Valid expressions should return itself.", () => {
    test.each([
      { expression: "20%" },
      { expression: "5×5" },
      { expression: "4÷2" },
      { expression: "5(4)(33÷11)" },
      { expression: "-9.432÷3(95)" },
    ])("$expression should return $expression", ({ expression }) => {
      expect(buildExpressionForHistoryDisplay(expression)).toBe(expression);
    });
  });

  describe("An invalid but previously valid expression should return a valid expression.", () => {
    test.each([
      { invalid: "1(1)-", valid: "1(1)" },
      { invalid: "443+12+", valid: "443+12" },
      { invalid: "10-2-45-", valid: "10-2-45" },
      { invalid: "56(423)(((((", valid: "56(423)" },
      { invalid: "3(42)(659-", valid: "3(42)" },
      {
        invalid: "(34×(60-4%))((90+5(74))÷2)(21",
        valid: "(34×(60-4%))((90+5(74))÷2)",
      },
    ])("$before should return $after", ({ invalid, valid }) => {
      expect(buildExpressionForHistoryDisplay(invalid)).toBe(valid);
    });
  });
});
