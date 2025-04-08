import { SideMenu } from './components/side-menu/side-menu.component';
import { Header } from './components/header.component';

import styles from './company.module.sass';


export const Company = () => {
  // useEffect(() => {
  //   const fn = async () => {
  //     const res = await api.get('/companies/12');
  //     const company = res.data;
  //     console.log(company);
  //   }
  //   fn();
  // }, []);
  return (
    <section className={styles.company}>
      <SideMenu />
      <Header />
    </section>
  );
};
