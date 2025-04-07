import { SvgIcon } from '@/modules/shared/components';

import { NavLinkIconWrapper } from './navlink-icon-wrapper.component.tsx';
import styles from './navbar.module.sass';
import { NavLink } from 'react-router-dom';


export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__first_block}>
        <NavLink to="/">
          <SvgIcon name="tree-logo" className={styles.navbar__logo} />
        </NavLink>
        <NavLinkIconWrapper to="/company">
          <SvgIcon name="company" className={styles.navbar__icon} />
        </NavLinkIconWrapper>
        <NavLinkIconWrapper to="/search">
          <SvgIcon name="search" className={styles.navbar__icon} />
        </NavLinkIconWrapper>
      </div>
      <div className={styles.navbar__second_block}>
        <span className={styles.navbar__dash} />
        <NavLinkIconWrapper to="/settings">
          <SvgIcon name="settings" className={styles.navbar__icon} />
        </NavLinkIconWrapper>
        <NavLinkIconWrapper to="">
          <SvgIcon name="sign-out" className={styles.navbar__icon} />
        </NavLinkIconWrapper>
      </div>
    </nav>
  );
};