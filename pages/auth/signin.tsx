import React, { useState } from "react";
import styles from "./auth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/auth";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { signIn } from "next-auth/react";

type Inputs = {
  email: string;
  password: string;
};

const Signin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(loginSchema) });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });

    console.log(result);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3 className={styles.title}>Вход</h3>
        <div className={styles.formGroup}>
          <div className={styles.iconInput}>
            <input
              defaultValue="abdrashevomurlan@gmail.com"
              {...register("email")}
              className={styles.input}
              placeholder="Почта"
              type="text"
            />
            <AiOutlineMail className={styles.icon} />
          </div>
          <span className={styles.error}>{errors.email?.message}</span>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.iconInput}>
            <input
              defaultValue="omurlan2002"
              {...register("password")}
              className={styles.input}
              placeholder="Пароль"
              type={showPassword ? "text" : "password"}
            />
            {showPassword ? (
              <AiFillEyeInvisible
                onClick={handleShowPassword}
                className={styles.icon}
              />
            ) : (
              <AiFillEye onClick={handleShowPassword} className={styles.icon} />
            )}
          </div>
          <span className={styles.error}>{errors.password?.message}</span>
        </div>
        <button type="submit" className={styles.button}>
          Войти
        </button>
        <Link className={styles.link} href="/auth/signup">
          Создать профиль
        </Link>
      </form>
    </div>
  );
};

export default Signin;
