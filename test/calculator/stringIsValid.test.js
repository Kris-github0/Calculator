const { stringIsValid } = require("../../src/modules/calculator");

describe("stringIsValid", () => {
  describe("Must start with a number, minus or left bracket.", () => {
    test.each([
      { char: "number", expected: true, example: "5×3" },
      { char: "-", expected: true, example: "-60+43" },
      { char: "(", expected: true, example: "(3)×(4)" },
      { char: ")", expected: false, example: ")" },
      { char: "%", expected: false, example: "%" },
      { char: "+", expected: false, example: "+" },
      { char: "×", expected: false, example: "×" },
      { char: "÷", expected: false, example: "÷" },
      { char: ".", expected: false, example: "." },
    ])(
      "Starting with a $char should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe("A number can have one dot at most.", () => {
    test("A number with no . should return true", () => {
      expect(stringIsValid("100")).toBe(true);
    });

    test("A number with one . should return true", () => {
      expect(stringIsValid("3.5")).toBe(true);
    });

    test.each([
      { multiDotNumber: "8.5.3" },
      { multiDotNumber: "8..53" },
      { multiDotNumber: "8.53." },
      { multiDotNumber: "853.." },
      { multiDotNumber: "85..3" },
      { multiDotNumber: ".8.5.3." },
    ])(
      "A number with more than one . should return false",
      ({ multiDotNumber }) => {
        expect(stringIsValid(multiDotNumber)).toBe(false);
      }
    );
  });
  describe(`A × must be followed by a number, minus or left bracket.
  It also cannot be preceded by a left bracket.`, () => {
    test.each([
      { followedBy: "number", expected: true, example: "4×4" },
      { followedBy: "-", expected: true, example: "2.4×-538" },
      { followedBy: "(", expected: true, example: "243×(988)" },
      { followedBy: ")", expected: false, example: "(10×)" },
      { followedBy: "+", expected: false, example: "(522×+(4))" },
      { followedBy: "×", expected: false, example: "10××2" },
      { followedBy: "÷", expected: false, example: "3×÷2" },
      { followedBy: ".", expected: false, example: "56×.67" },
      { followedBy: "%", expected: false, example: "(645)-98×%4.654" },
    ])(
      "A × followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([{ example: "1(×2)" }])(
      "A × preceded by a ( should return false",
      ({ example }) => {
        expect(stringIsValid(example)).toBe(false);
      }
    );
  });

  describe(`A ÷ must be followed by a number, minus or left bracket. 
  It also cannot be preceded by a left bracket.`, () => {
    test.each([
      { followedBy: "number", expected: true, example: "142÷6" },
      { followedBy: "-", expected: true, example: "3432÷-534" },
      { followedBy: "(", expected: true, example: "1.4÷(3)" },
      { followedBy: ")", expected: false, example: "(9078÷)" },
      { followedBy: "+", expected: false, example: "300÷+20" },
      { followedBy: "×", expected: false, example: "4÷×2" },
      { followedBy: "÷", expected: false, example: "3÷÷1" },
      { followedBy: ".", expected: false, example: "56÷.989" },
      { followedBy: "%", expected: false, example: "32÷%3" },
    ])(
      "A ÷ followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([{ example: "2(43(÷10))" }])(
      "A ÷ preceded by a ( should return false",
      ({ example }) => {
        expect(stringIsValid(example)).toBe(false);
      }
    );
  });

  describe(`A + must be followed by a number or left bracket. 
  It also cannot be preceded by a left bracket.`, () => {
    test.each([
      { followedBy: "number", expected: true, example: "34+943" },
      { followedBy: "(", expected: true, example: "94+(42)" },
      { followedBy: ")", expected: false, example: "(3+)" },
      { followedBy: "-", expected: false, example: "1+-1" },
      { followedBy: "+", expected: false, example: "(12)++(3423÷20)" },
      { followedBy: "×", expected: false, example: "(443×8)+×2" },
      { followedBy: "÷", expected: false, example: "55+÷20" },
      { followedBy: ".", expected: false, example: "54+.2" },
    ])(
      "A + followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([{ example: "(+3)(5)" }])(
      "A + preceded by a ( should return false",
      ({ example }) => {
        expect(stringIsValid(example)).toBe(false);
      }
    );
  });

  describe("A - must be followed by a number or left bracket.", () => {
    test.each([
      { followedBy: "number", expected: true, example: "-20" },
      { followedBy: "(", expected: true, example: "-(10)" },
      { followedBy: ")", expected: false, example: "(43-)" },
      { followedBy: "+", expected: false, example: "405-+345" },
      { followedBy: "-", expected: false, example: "43--43" },
      { followedBy: "×", expected: false, example: "312-×43" },
      { followedBy: "÷", expected: false, example: "89543-÷432" },
      { followedBy: ".", expected: false, example: "-100-.4" },
    ])(
      "A - followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe("A . must be followed and preceded by a number.", () => {
    test.each([
      { followedBy: "number", expected: true, example: "3.3" },
      { followedBy: "+", expected: false, example: "76.+" },
      { followedBy: "-", expected: false, example: "42.-" },
      { followedBy: "÷", expected: false, example: "54.÷" },
      { followedBy: "×", expected: false, example: "42543.×" },
      { followedBy: "%", expected: false, example: "100.%" },
      { followedBy: "(", expected: false, example: "542×34.(44)" },
      { followedBy: ")", expected: false, example: "(60.)×3" },
    ])(
      "A . followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([
      { precededBy: "number", expected: true, example: "10.0" },
      { precededBy: "+", expected: false, example: "343+.5" },
      { precededBy: "-", expected: false, example: "(3)(3)-.342" },
      { precededBy: "÷", expected: false, example: "54÷.321" },
      { precededBy: "×", expected: false, example: "400×.20" },
      { precededBy: "%", expected: false, example: "100%.3" },
      { precededBy: "(", expected: false, example: "(.3442)" },
      { precededBy: ")", expected: false, example: "(60).4" },
    ])(
      "A . preceded by a $precededBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe(`A % must be preceded by a number or right bracket. 
  It also must be followed by an operator or bracket.`, () => {
    test.each([
      { precededBy: "number", expected: true, example: "100%" },
      { precededBy: ")", expected: true, example: "(34×2+91)%" },
      { precededBy: "(", expected: false, example: "100(%)" },
      { precededBy: "+", expected: false, example: "543+%" },
      { precededBy: "-", expected: false, example: "30×10-%" },
      { precededBy: "×", expected: false, example: "3×%" },
      { precededBy: "÷", expected: false, example: "43+44.43÷%" },
      { precededBy: ".", expected: false, example: "2.%" },
    ])(
      "A % preceded by a $precededBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([
      { followedBy: "+", expected: true, example: "50%+3.5" },
      { followedBy: "-", expected: true, example: "100%-4" },
      { followedBy: "×", expected: true, example: "25%×12" },
      { followedBy: "÷", expected: true, example: "75%÷3" },
      { followedBy: "(", expected: true, example: "20%(58)" },
      { followedBy: ")", expected: true, example: "5(20%)" },
      { followedBy: "number", expected: false, example: "30%3" },
      { followedBy: ".", expected: false, example: "20%.43" },
    ])(
      "A % followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe("String cannot start with a 0 followed by a number.", () => {
    test("A 0 followed by a number should return false", () => {
      expect(stringIsValid("012")).toBe(false);
    });
  });

  describe("String cannot have a 0 preceded by a bracket or operator then followed by a number.", () => {
    test.each([
      { precededBy: "(", example: "(0100)" },
      { precededBy: ")", example: "(543-91)03" },
      { precededBy: "+", example: "100+034" },
      { precededBy: "-", example: "452-0108" },
      { precededBy: "×", example: "30×030" },
      { precededBy: "÷", example: "5439÷04" },
    ])(
      "A 0 preceded by a $precededby then followed by a number should return false",
      ({ example }) => {
        expect(stringIsValid(example)).toBe(false);
      }
    );
  });

  describe(`String should not have a 0 preceded by an operator or 
  bracket then followed by a number and a dot.`, () => {
    test.each([
      { precededBy: "+", example: "+03.3" },
      { precededBy: "-", example: "-012.43" },
      { precededBy: "×", example: "40×00.3" },
      { precededBy: "÷", example: "100÷01." },
      { precededBy: "(", example: "4×(03.4)" },
      { precededBy: ")", example: "(8)06.45" },
    ])(
      "A 0 preceded by a $precededby then followed by a number and a . should return false",
      ({ example }) => {
        expect(stringIsValid(example)).toBe(false);
      }
    );
  });

  describe("String cannot have empty brackets.", () => {
    test.each([
      { emptyBrackets: "()" },
      { emptyBrackets: "-()" },
      { emptyBrackets: "(()())" },
      { emptyBrackets: "((1)())" },
      { emptyBrackets: "((5)(20))()" },
    ])("$emptyBrackets should return false", ({ emptyBrackets }) => {
      expect(stringIsValid(emptyBrackets)).toBe(false);
    });
  });

  describe("A × or ÷ should be preceded by a number, % or right bracket.", () => {
    test.each([
      { precededBy: "number", expected: true, example: "5932×312" },
      { precededBy: "%", expected: true, example: "1%×34" },
      { precededBy: ")", expected: true, example: "(12+93)(3)×34" },
      { precededBy: "(", expected: false, example: "32(×50)" },
      { precededBy: "+", expected: false, example: "42+×2" },
      { precededBy: "-", expected: false, example: "85-×6" },
      { precededBy: "÷", expected: false, example: "6÷×3" },
      { precededBy: "×", expected: false, example: "4(3××2)" },
    ])(
      "A × that is preceded by a $precededBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );

    test.each([
      { precededBy: "number", expected: true, example: "50÷5" },
      { precededBy: "%", expected: true, example: "430%÷10" },
      { precededBy: ")", expected: true, example: "(35)÷654" },
      { precededBy: "(", expected: false, example: "11(÷3)" },
      { precededBy: "+", expected: false, example: "(23)+÷3" },
      { precededBy: "-", expected: false, example: "30%-÷133" },
      { precededBy: "×", expected: false, example: "20×÷12" },
      { precededBy: "÷", expected: false, example: "5÷÷10" },
    ])(
      "A ÷ that is preceded by a $precededBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe("A + must be preceded by a number, %, right bracket or e.", () => {
    test.each([
      { precededBy: "number", expected: true, example: "34+" },
      { precededBy: "%", expected: true, example: "50%" },
      { precededBy: ")", expected: true, example: "(4)+3" },
      { precededBy: "e", expected: true, example: "343e+203" },
      { precededBy: "-", expected: false, example: "10-+3" },
      { precededBy: "×", expected: false, example: "12×+5" },
      { precededBy: "÷", expected: false, example: "74÷+65" },
      { precededBy: "+", expected: false, example: "(103)++2" },
    ])(
      "A + that is preceded by a $precededBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });

  describe("An e must be followed by a + or -.", () => {
    test.each([
      { followedBy: "-", expected: true, example: "4e-40" },
      { followedBy: "+", expected: true, example: "200e+3" },
      { followedBy: "÷", expected: false, example: "4.4323e÷3" },
      { followedBy: "%", expected: false, example: "6.143254e%4" },
      { followedBy: "×", expected: false, example: "5.532347856e×50" },
      { followedBy: "number", expected: false, example: "2.75344453e4" },
    ])(
      "An e that is followed by a $followedBy should return $expected",
      ({ example, expected }) => {
        expect(stringIsValid(example)).toBe(expected);
      }
    );
  });
});
