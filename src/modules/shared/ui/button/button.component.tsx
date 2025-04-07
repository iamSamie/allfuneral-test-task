import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './button.module.sass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  appearance: 'filled' | 'outline' | 'flattened' | 'only_icon' | 'arrow';
  className?: string;
  icon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    appearance,
    className,
    fullWidth,
    children,
    icon,
    ...rest
  } = props;

  const style = clsx(
    styles[appearance],
    { [styles.fullWidth]: fullWidth },
    className,
  );

  return (
    <button
      type="button"
      className={style}
      {...rest}
    >
      {icon && icon}
      {children}
    </button>
  );
};
