import { Navbar } from './components/navbar/navbar.component';

import styles from'./sidebar.module.sass';

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Navbar />
    </aside>
  );
};
