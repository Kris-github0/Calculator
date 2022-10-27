const { resize } = require("../../src/modules/calculator");

describe("resize", () => {
  describe("Returned numbers length should be less than or equal to 12.", () => {
    test.each([
      { longNumber: 2330321332323 },
      { longNumber: 83924382904324242 },
      { longNumber: -4.423784243263e-35 },
      { longNumber: 1.4432040000000042342443 },
      { longNumber: -2.5945383442042384232423 },
      { longNumber: 2.0000000000000000003e312 },
      { longNumber: 423.4343434343434343434343 },
      { longNumber: 428494239824849423048428349 },
      { longNumber: 54432.00000000000000000000034 },
      { longNumber: 7.48903537987234843424342e-274 },
      { longNumber: 1.3333333333333333333333333333 },
      { longNumber: 1231338910329138.31231312349324 },
      { longNumber: 100000000000000000000000000000000 },
      { longNumber: 0.0000000000000000000000000000001 },
      { longNumber: 843920844098324849038428490238428 },
      { longNumber: 5483954893539085543859854398538943 },
      { longNumber: 3.43289482394832904895792489348e40 },
      { longNumber: 9.2330000000000000000000000000000003213 },
      { longNumber: -8957439759874237849274274832748297423987 },
      { longNumber: 957208947395024957395498085390889503485038589538 },
    ])("$longNumber", ({ longNumber }) => {
      expect(resize(longNumber).length).toBeLessThanOrEqual(12);
    });
  });
});
