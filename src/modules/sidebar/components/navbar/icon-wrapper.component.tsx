import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './navbar.module.sass';

interface IconWrapperProps {
  isActive: boolean;
  children: ReactNode;
}

export const IconWrapper = ({ isActive, children }: IconWrapperProps) => {
  return (
    <span
      className={clsx(styles.navbar__icon_wrapper, {
        [styles.navbar__icon_wrapper_active]: isActive,
      })}
    >
      {children}
    </span>
  );
};