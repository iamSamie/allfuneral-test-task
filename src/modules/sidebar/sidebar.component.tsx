import { Navbar } from './components/navbar/navbar.component';
import { SideMenu } from './components/side-menu/side-menu.component.tsx';

import styles from'./sidebar.module.sass';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Navbar />
      <SideMenu />
    </aside>
  );
};
