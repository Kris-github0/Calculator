const { validBrackets } = require("../../src/modules/calculator");

describe("validBrackets", () => {
  describe("Valid brackets should return true", () => {
    test.each([
      { valid: "()" },
      { valid: "()()" },
      { valid: "(())" },
      { valid: "(()())" },
      { valid: "(())()(())" },
      { valid: "((((()))))" },
    ])("$valid should return true", ({ valid }) => {
      expect(validBrackets(valid)).toBe(true);
    });

    describe("Unfinished but potentially valid should return true.", () => {
      test.each([
        { potentiallyValid: "(" },
        { potentiallyValid: "(()(" },
        { potentiallyValid: "(((((())" },
        { potentiallyValid: "(((((((((((" },
      ])("$potentiallyValid should return true", ({ potentiallyValid }) => {
        expect(validBrackets(potentiallyValid)).toBe(true);
      });
    });
  });

  describe("Invalid brackets should return false.", () => {
    test.each([
      { invalidBrackets: ")" },
      { invalidBrackets: ")(" },
      { invalidBrackets: "())" },
      { invalidBrackets: ")()" },
      { invalidBrackets: ")()(" },
      { invalidBrackets: "()())" },
      { invalidBrackets: "(()()))" },
      { invalidBrackets: "))))))))))" },
    ])("$invalidBrackets should return false", ({ invalidBrackets }) => {
      expect(validBrackets(invalidBrackets)).toBe(false);
    });
  });
});
