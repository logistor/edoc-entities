/* eslint-disable no-undef */
import factory from "./container.js";

describe("Image container", function () {
  describe("Img array constructor", function () {
    test("Parameter is undefined", function () {
      function create() {
        factory(undefined);
      }
      expect(create).toThrowError("Constructor is undefined.");
    });
    test("Parameter does not contain image array", function () {
      function create() {
        factory({});
      }
      expect(create).toBeTruthy();
    });
  });
  describe("Img array methods", function () {
    /**
     * @type {import("./container").container}
     */
    let imgArray;
    beforeEach(() => {
      const img = {
        url: "http://localhost/image.jpg",
        caption: "Image caption",
      };
      const images = {
        images: [img],
      };
      imgArray = factory(images);
    });
    test("Get images when array is empty", function () {
      const imgArray = factory({});
      //const images = imgArray.getDescriptions();
      expect(imgArray).toBe(undefined);
    });
    test("Get images when array contains img", function () {
      const array = imgArray.getImgs();
      expect(array.length).toEqual(1);
    });
    test("Add img", function () {
      const img = {
        url: "http://localhost/image2.jpg",
        caption: "Image caption",
      };
      const len = imgArray.addImg(img);
      expect(len).toBe(2);
    });
    test("Get img", function () {
      const img = imgArray.getImg("http://localhost/image.jpg");
      expect(img.getCaption()).toBe("Image caption");
    });
    test("Get image with invalid url", function () {
      function invalidUrl() {
        imgArray.getImg("http://localhost/jee.jpg");
      }
      expect(invalidUrl).toThrowError("Invalid url.");
    });
    test("Remove img", function () {
      const url = "http://localhost/image.jpg";
      imgArray.removeImg(url);
      expect(imgArray.getImgs().length).toBe(0);
    });
    test("To JSON", function () {
      const json = imgArray.toJSON();
      //console.log(json);
      expect(json).toEqual([
        { url: "http://localhost/image.jpg", caption: "Image caption" },
      ]);
    });
  });
});
