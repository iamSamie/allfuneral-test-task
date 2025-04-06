import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './input.module.sass';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = (props: InputProps) => {
  const { className } = props;

  const style = clsx(
      styles.input,
    className,
  )
  return (
    <input
      className={style}
      {...props}
    />
  );
};
