import * as yup from "yup";

export const categoryFormSchema = yup
  .object({
    id: yup.number().nullable(),
    name: yup.string().required("Field required"),
  })
  .required();
