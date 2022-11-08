import projectMock from "../project/project.mock";
import { TYPE_SIGNATURE } from "../form/form";

export default function () {
  const mock = [
    {
      _id: "60211acd7a96b510c0ae6c1a",
      company_id: "60211acd7a96b510c0ae6c8c",
      owner_id: "60211acd7a96b510c0ae6c8d",
      name: "Työpöytäkirja",
      project: projectMock[4],
      sections: [
        {
          id: 10,
          type: "input",
          label: "Työnumero",
          value: "123456",
        },
        {
          id: 100,
          type: "imageCard",
          label: undefined,
          value: undefined,
          images: [
            {
              url: "http://localhost/image.jpg",
              caption: "Image caption",
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
    },
  ];
  return mock;
}
