import * as yup from "yup";

export const petFormSchema = yup
  .object({
    id: yup.number(),
    name: yup.string().required("Field required"),
    description: yup.string(),
    urlImage: yup.string(),
    category: yup
      .object({
        id: yup.number().required("Field required"),
        name: yup.string().required("Field required"),
      })
      .required("Field required"),
    birthDate: yup.date().required("Field required"),
    status: yup.string().required("Field required"),
  })
  .required();
