import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './button.module.sass';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  appearance: 'filled' | 'outline' | 'flattened' | 'only_icon' | 'arrow';
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  appearance,
  className,
  iconClassName,
  fullWidth,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const style = clsx(
    styles[appearance],
    { [styles.fullWidth]: fullWidth },
    className,
  );

  return (
    <button
      type="button"
      className={style}
      {...(props)}
    >
      {icon && icon}
      {children}
    </button>
  );
};
