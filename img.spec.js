/* eslint-disable no-undef */
import factory from "./img";

describe("Image description", function () {
  describe("Description constructor", function () {
    test("Parameter is undefined", function () {
      function create() {
        factory(undefined);
      }
      expect(create).toThrowError("Constructor is undefined.");
    });
    test("Url is undefined", function () {
      function create() {
        factory({
          url: undefined,
          caption: undefined,
        });
      }
      expect(create).toThrowError("Url is undefined or null.");
    });
    test("Url is null", function () {
      function create() {
        factory({
          url: null,
          caption: undefined,
        });
      }
      expect(create).toThrowError("Url is undefined or null.");
    });
    test("Url is not a string", function () {
      function create() {
        factory({ url: 5 });
      }
      expect(create).toThrowError("Url is not a String.");
    });
    test("Url is zero length", function () {
      function create() {
        factory({
          url: "",
          caption: undefined,
        });
      }
      expect(create).toThrowError("Url is zero length.");
    });
  });
  describe("Description methods", function () {
    /**
     * @type {import("./img").img}
     */
    let wrap;
    beforeEach(() => {
      wrap = factory({
        url: "http://localhost/image.jpg",
        caption: "Image caption",
      });
    });
    test("Get section", function () {
      const url = wrap.getUrl();
      expect(url).toEqual("http://localhost/image.jpg");
    });
    test("Set caption", function () {
      const caption = wrap.getCaption();
      expect(caption).toEqual("Image caption");
    });
    test("toJSON", function () {
      const json = JSON.stringify(wrap);
      expect(json).toEqual(
        '{"url":"http://localhost/image.jpg","caption":"Image caption"}'
      );
    });
  });
});
