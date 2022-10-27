describe("alreadyInHistoryList", () => {
  test("If expression already in history list, return true.", () => {
    const historyListMock = ["2+2", "432×9432", "5/8"];
    const newExpression = "432×9432";

    const alreadyInHistoryListMock = historyListMock.includes(newExpression);

    expect(alreadyInHistoryListMock).toBe(true);
  });

  test("If expression not in history list, return false.", () => {
    const historyListMock = ["543-324", "34.24(5)", "4×56"];
    const newExpression = "83(43)÷59";

    const alreadyInHistoryListMock = historyListMock.includes(newExpression);

    expect(alreadyInHistoryListMock).toBe(false);
  });
});
