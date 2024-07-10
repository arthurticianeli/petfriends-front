import * as yup from "yup";

export interface LoginForm {
  email: string;
  password: string;
  name?: string;
}

export const loginFormSchema = yup
  .object({
    email: yup.string().required("Field required").email("Invalid email"),
    password: yup
      .string()
      .required("Field required")
      .min(6, "Password must be at least 6 characters"),
    username: yup.string(),
  })
  .required();
