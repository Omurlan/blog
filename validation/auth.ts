import * as yup from "yup";

export const authSchema = yup.object({
  email: yup.string().email("Некорректная почта").required("Обязательно"),
  username: yup.string().required("Обязательно"),
  password: yup
    .string()
    .required("Обязательно")
    .min(8, "Пароль слишком короткий, минимум 8 символов"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательно"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Некорректная почта").required("Обязательно"),
  password: yup
    .string()
    .min(8, "Пароль слишком короткий, минимум 8 символов")
    .required("Обязательно"),
});
