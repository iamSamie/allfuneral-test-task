import { SideMenu } from './components/side-menu/side-menu.component';
import { Header } from './components/header.component';
import { useCompanyStore } from './store/use-company-store.ts';

import styles from './company.module.sass';
import { observer } from 'mobx-react-lite';


export const Company = observer(() => {
  const store = useCompanyStore();

  if (store.isLoading) return <div>Loading...</div>
  if (store.error) return <div>Something went wrong...</div>;
  if (!store.company) return <div>No company data</div>;

  return (
    <section className={styles.company}>
      <SideMenu />
      <Header name={store.company?.name} />
    </section>
  );
});
