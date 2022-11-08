/* eslint-disable no-undef */
import factory from "./subset.js";
import mock from "./subset.mock.js";

describe("Subset", function () {
  describe("Constructor", function () {
    test("Create array of subsets", function () {
      const subsets = factory(mock);
      expect(subsets[1].getId()).toEqual("56789");
      expect(subsets[1].getName()).toEqual("Työpöytäkirja");
      expect(subsets[1].getTitle()).toEqual("Nieminen");
      expect(subsets[1].getSubTitle()).toEqual("56789");
    });
  });
});
