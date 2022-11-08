/* eslint-disable no-undef */
import factory from "./section.js";
import mock from "./section.mock.js";

describe("Section", function () {
  describe("Section constructor", function () {
    test("Parameter is undefined", function () {
      function create() {
        factory(undefined);
      }
      expect(create).toThrowError("Constructor is undefined.");
    });
    test("Id is undefined", function () {
      function create() {
        factory({ id: undefined });
      }
      expect(create).toThrowError("Id is undefined.");
    });
    test("Id is not an Integer", function () {
      function create() {
        factory({ id: "1" });
      }
      expect(create).toThrowError("Id is not an Integer.");
    });
    test("Type is undefined", function () {
      function create() {
        factory({ id: 1, type: undefined });
      }
      expect(create).toThrowError("Type is undefined or zero length string.");
    });
    test("Type is zero length string", function () {
      function create() {
        factory({ id: 1, type: "" });
      }
      expect(create).toThrowError("Type is undefined or zero length string.");
    });
    test("Type is not a String", function () {
      function create() {
        factory({ id: 1, type: 2 });
      }
      expect(create).toThrowError("Type is not a String.");
    });
  });
  describe("Section methods", function () {
    test("Get id", function () {
      const id = mock()[0].getId();
      expect(id).toEqual(10);
    });
    test("Get type", function () {
      const type = mock()[0].getType();
      expect(type).toEqual("input");
    });
    test("Get string value", function () {
      const value = mock()[0].getValue();
      expect(value).toEqual("123456");
    });
    test("Get undefined value", function () {
      const value = mock()[1].getValue();
      expect(value).toEqual(undefined);
    });
    test("Get images", function () {
      const images = mock()[1].getImages();
      expect(images.length).toEqual(1);
    });
    test("Add images", function () {
      const section = mock()[1];
      section.addImage({ url: "http://newImage.jpg" });
      expect(section.getImages().length).toEqual(2);
    });
    test("Remove images", function () {
      const section = mock()[1];
      section.removeImage("http://localhost/image.jpg");
      expect(section.getImages().length).toEqual(0);
    });
    test("To JSON", function () {
      const json = mock()[1].toJSON();
      //console.log(json);
      expect(json).toEqual({
        id: 100,
        type: "imageCard",
        style: "private",
        value: undefined,
        images: [
          { url: "http://localhost/image.jpg", caption: "Image caption" },
        ],
      });
    });
  });
});
