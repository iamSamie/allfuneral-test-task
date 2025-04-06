import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.sass';

interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {}

type ButtonOnClick = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | (() => void);

interface CommonButtonProps {
  appearance: 'filled' | 'outline' | 'flattened' | 'icon';
  className?: string;
  icon: ReactNode;
  children: ReactNode;
  onClick?: ButtonOnClick;
  fullWidth?: boolean;
}

type ButtonProps = CommonButtonProps & ButtonAttributes;

export const Button = ({
  appearance,
  className,
  onClick,
  fullWidth,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const style = clsx(
    styles[appearance],
    {
      [styles.fullWidth]: fullWidth,
    },
    className,
  );

  return (
    <button
      type="button"
      className={style}
      onClick={() => (onClick as ButtonOnClick)?.()}
      {...(props as ButtonAttributes)}
    >
      {icon}
      {children}
    </button>
  );
};
