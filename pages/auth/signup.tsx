import React, { useState } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';
import cn from 'classnames';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '../../validation/auth';

export type AuthForm = {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
};

type Result = {
  status: 'warning' | 'success';
  message: string;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [result, setResult] = useState<Result | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthForm>({ resolver: yupResolver(authSchema) });

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    setResult(result);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>Регистрация</h3>

        <div className={styles.formGroup}>
          <div className={styles.iconInput}>
            <input
              {...register('email')}
              className={styles.input}
              placeholder="Почта"
              type="text"
            />
            <AiOutlineMail className={styles.icon} />
          </div>
          <span className={styles.error}>{errors.email?.message}</span>
        </div>

        <div className={styles.formGroup}>
          <input {...register('username')} className={styles.input} placeholder="Никнейм" />
          <span className={styles.error}>{errors.username?.message}</span>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.iconInput}>
            <input
              {...register('password')}
              className={styles.input}
              placeholder="Пароль"
              type={showPassword ? 'text' : 'password'}
            />
            {showPassword ? (
              <AiFillEyeInvisible onClick={handleShowPassword} className={styles.icon} />
            ) : (
              <AiFillEye onClick={handleShowPassword} className={styles.icon} />
            )}
          </div>
          <span className={styles.error}>{errors.password?.message}</span>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.passwordInput}>
            <input
              {...register('repeatPassword')}
              className={styles.input}
              placeholder="Повторите пароль"
              type="password"
            />
          </div>
          <span className={styles.error}>{errors.repeatPassword?.message}</span>
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.button}>
            Создать профиль
          </button>
          {result !== null && (
            <span
              onClick={() => setResult(null)}
              className={cn(styles.result, {
                [styles.success]: result.status === 'success',
                [styles.warning]: result.status === 'warning',
              })}
            >
              {result.message}
            </span>
          )}
          o
        </div>

        <Link className={styles.link} href="/auth/signin">
          Уже есть профиль
        </Link>
      </form>
    </div>
  );
};

export default Signup;
