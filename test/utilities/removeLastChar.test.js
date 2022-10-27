const { removeLastChar } = require("../../src/modules/utilities");

describe("removeLastChar", () => {
  test.each([
    { before: "", after: "" },
    { before: "%", after: "" },
    { before: "1)", after: "1" },
    { before: "()", after: "(" },
    { before: "100++", after: "100+" },
    { before: "432..", after: "432." },
    { before: "6.89204823e--", after: "6.89204823e-" },
  ])("A strings last character should be removed", ({ before, after }) => {
    expect(removeLastChar(before)).toBe(after);
  });
});
