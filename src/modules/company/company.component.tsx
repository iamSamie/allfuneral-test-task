import { SideMenu } from './components/side-menu/side-menu.component';
import { Header } from './components/header.component';

import styles from './company.module.sass';


export const Company = () => {
  return (
    <section className={styles.company}>
      <SideMenu />
      <Header />
    </section>
  );
};
