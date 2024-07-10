import * as yup from "yup";

export const petFormSchema = yup
  .object({
    id: yup.number().nullable(),
    name: yup.string().required("Field required"),
    description: yup.string().nullable(),
    urlImage: yup.string().nullable(),
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
