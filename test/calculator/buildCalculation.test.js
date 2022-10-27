const { buildCalculation } = require("../../src/modules/calculator");

describe("buildCalculation", () => {
  test.each([
    { before: "2×3", after: "2*3" },
    { before: "10÷2", after: "10/2" },
    { before: "20(5)", after: "20*(5)" },
    { before: "100%", after: "100*0.01" },
    { before: "(5×8)(6÷3)", after: "(5*8)*(6/3)" },
    { before: "3((5×8)(6÷3)÷10)", after: "3*((5*8)*(6/3)/10)" },
    { before: "1042465432.32×53%", after: "1042465432.32*53*0.01" },
    {
      before: "34+3%×8-20(4)(130÷32)2",
      after: "34+3*0.01*8-20*(4)*(130/32)*2",
    },
    {
      before: "((20+4)((623×23)(3342÷312)))8",
      after: "((20+4)*((623*23)*(3342/312)))*8",
    },
    {
      before: "82309482×(42378÷8749×(4238)×48392)×(8443+5×(954))-9.45353e-234",
      after: "82309482*(42378/8749*(4238)*48392)*(8443+5*(954))-9.45353e-234",
    },
  ])("$before should return $after", ({ before, after }) => {
    expect(buildCalculation(before)).toBe(after);
  });
});
