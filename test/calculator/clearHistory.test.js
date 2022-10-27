/**
 * @jest-environment jsdom
 */

describe("clearHistory", () => {
  test.each([
    { length: 0 },
    { length: 4 },
    { length: 10 },
    { length: 30 },
    { length: 40 },
    { length: 100 },
  ])("History list should have no children", ({ length }) => {
    const historyList = document.createElement("ul");
    for (let i = 0; i < length; i++) {
      historyList.append(document.createElement("li"));
    }

    while (historyList.lastChild) {
      historyList.removeChild(historyList.lastChild);
    }

    expect(historyList.childElementCount).toBe(0);
  });
});
