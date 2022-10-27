describe("copyToClipboard", () => {
  test("Text should be in clipboard", () => {
    const string = "abc";
    const clipboardMock = {
      value: "",
      writeText: function (str) {
        this.value = str;
      },
      read: function () {
        return this.value;
      },
    };

    clipboardMock.writeText(string);

    expect(clipboardMock.read()).toBe(string);
  });
});
