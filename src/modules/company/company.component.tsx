import { observer } from 'mobx-react-lite';

import { useCompanyStore } from './store/use-company-store.ts';
import { SideMenu } from './components/side-menu/side-menu.component';
import { Layout } from './layout.component.tsx';

import styles from './company.module.sass';


export const Company = observer(() => {
  const store = useCompanyStore();

  if (store.isLoading) return <div>Loading...</div>
  if (store.error) return <div>{store.error}</div>;
  if (!store.company) return <div>No company data</div>;

  return (
    <section className={styles.company}>
      <SideMenu />
      <Layout company={store.company} />
    </section>
  );
});
