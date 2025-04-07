import { SvgIcon } from '@/modules/shared/components';

import { IconWrapper } from './icon-wrapper.component';
import styles from './navbar.module.sass';


export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__first_block}>
        <SvgIcon name="tree-logo" className={styles.navbar__logo} />
        <IconWrapper isActive={true}>
          <SvgIcon name="company" className={styles.navbar__icon} />
        </IconWrapper>
        <IconWrapper isActive={false}>
          <SvgIcon name="search" className={styles.navbar__icon} />
        </IconWrapper>
      </div>
      <div className={styles.navbar__second_block}>
        <span className={styles.navbar__dash} />
        <IconWrapper isActive={false}>
          <SvgIcon name="settings" className={styles.navbar__icon} />
        </IconWrapper>
        <IconWrapper isActive={false}>
          <SvgIcon name="sign-out" className={styles.navbar__icon} />
        </IconWrapper>
      </div>
    </nav>
  );
};