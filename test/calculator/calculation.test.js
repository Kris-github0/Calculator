const { calculation } = require("../../src/modules/calculator");

describe("calculation", () => {
  describe("An expression should return a number.", () => {
    test.each([
      { expression: "2+2" },
      { expression: "3*(7)" },
      { expression: "(2)*4" },
      { expression: "823*(3)/10" },
      { expression: "695.34*30*0.01" },
      { expression: "5434*4432/34212+(34(((((" },
      { expression: "1.000000000000000000000000000-1" },
      { expression: "43289*(432)/8543+345*(343*(4)*(3453))*9" },
    ])("$expression", ({ expression }) => {
      expect(calculation(expression)).not.toBeNaN();
    });
  });

  describe("An expression without atleast 2 valid operands or a % should return an empty string.", () => {
    test.each([
      { expression: "1" },
      { expression: "0.6" },
      { expression: "-(543)" },
      { expression: "14432*-" },
      { expression: "(985438)+" },
      { expression: "(343)+(2*(321)" },
      { expression: "4.432434242e-34" },
      { expression: "7.895694465e+130" },
      { expression: "1000000000000000" },
      { expression: "-2330954890543.53534553" },
    ])("$expression", ({ expression }) => {
      expect(calculation(expression)).toBe("");
    });
  });
});
