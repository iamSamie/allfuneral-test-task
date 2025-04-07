import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import styles from './navbar.module.sass';

interface IconWrapperProps {
  to: string;
  children: ReactNode;
}

export const NavLinkIconWrapper = (props: IconWrapperProps) => {
  const {
    to,
    children,
  } = props;

  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={clsx(styles.navbar__icon_wrapper, {
        [styles.navbar__icon_wrapper_active]: isActive,
      })}
    >
      {children}
    </NavLink>
  );
};