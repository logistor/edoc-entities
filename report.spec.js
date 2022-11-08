/* eslint-disable no-undef */
import reportFactory from "./report.js";
import reportMock from "./report.mock.js";
import formMock from "../form/form.mock.js";
import { TYPE_SIGNATURE } from "../form/form";

describe("Report", function () {
  describe("Report constructor", function () {
    test("Report is undefined", function () {
      function create() {
        reportFactory(undefined);
      }
      expect(create).toThrowError("Constructor parameter is undefined.");
    });

    test("Name is undefined", function () {
      function create() {
        const data = { name: undefined };
        reportFactory(data);
      }
      expect(create).toThrowError("Name is undefined.");
    });

    test("Name is zero length", function () {
      function create() {
        const data = { name: "" };
        reportFactory(data);
      }
      expect(create).toThrowError("Name is undefined.");
    });

    test("Sections is undefined", function () {
      function create() {
        const data = { name: "Report" };
        reportFactory(data);
      }
      expect(create).toThrowError("Sections is undefined.");
    });

    test("Sections is undefined", function () {
      function create() {
        const data = { name: "Report", sections: 1 };
        reportFactory(data);
      }
      expect(create).toThrowError("Sections is not an array.");
    });

    test("Sections is zero length", function () {
      function create() {
        const data = { name: "Report", sections: [] };
        reportFactory(data);
      }
      expect(create).toThrowError("Sections is zero length.");
    });

    test("Create report from Form", function () {
      delete formMock._id;
      const report = reportFactory(formMock);
      const len = report.getSections().length;
      //console.log(report.toJSON());
      expect(len).toEqual(4);
    });
  });

  describe("Report methods", function () {
    test("isReadonly", function () {
      const rpt = reportFactory(reportMock()[0]);
      expect(rpt.isReadonly()).toEqual(true);
    });

    test("Get sections", function () {
      const rpt = reportFactory(reportMock()[0]);
      const sections = rpt.getSections();
      expect(sections.length).toEqual(3);
    });

    test("Set value", function () {
      const rpt = reportFactory(reportMock()[0]);
      /** @type {import("./section").section} */
      const section = rpt.getSection(10);
      section.setValue(98765);
      expect(section.getValue()).toEqual(98765);
    });

    test("Get section", function () {
      const rpt = reportFactory(reportMock()[0]);
      const section = rpt.getSection(100);
      expect(section.getType()).toEqual("imageCard");
    });

    /*
    test("Add image", function () {
      const rpt = reportFactory(reportMock()[0]);
      const len = rpt.addImg(100, "http://localhost:8000/report/image.jpg");
      expect(len).toEqual(2);
    });
    test("Set / Get caption", function () {
      const rpt = reportFactory(reportMock()[0]);
      rpt.setCaption(100, "http://localhost/image.jpg", "Some caption");
      const caption = rpt.getCaption(100, "http://localhost/image.jpg");
      expect(caption).toEqual("Some caption");
    });
    */
    test("toJSON", function () {
      const rpt = reportFactory(reportMock()[0]);
      const json = rpt.toJSON();
      //console.log(json);
      expect(json).toEqual({
        _id: "60211acd7a96b510c0ae6c1a",
        project: undefined,
        name: "Työpöytäkirja",
        sections: [
          {
            id: 10,
            type: "input",
            label: "Työnumero",
            value: "123456",
            images: undefined,
          },
          {
            id: 100,
            type: "imageCard",
            label: undefined,
            value: undefined,
            images: [
              {
                caption: "Image caption",
                url: "http://localhost/image.jpg",
              },
            ],
          },
          {
            id: 120,
            type: TYPE_SIGNATURE,
            style: "readonly",
            images: [
              {
                url: "http://localhost/signature.jpg",
                caption: "",
              },
            ],
          },
        ],
      });
    });
  });
});
