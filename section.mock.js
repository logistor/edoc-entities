import section from "./section.js";
export default function () {
  const mock = [
    {
      id: 10,
      type: "input",
      label: "Työnumero",
      style: "title",
      value: "123456",
      images: undefined,
    },
    {
      id: 100,
      type: "imageCard",
      label: undefined,
      style: "private",
      value: undefined,
      images: [
        {
          url: "http://localhost/image.jpg",
          caption: "Image caption",
        },
      ],
    },
  ];
  return mock.map((elem) => section(elem));
}
