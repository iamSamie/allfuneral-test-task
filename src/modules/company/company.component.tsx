import { observer } from 'mobx-react-lite';
import { useContactStore } from '@/modules/contacts';

import { useCompanyStore } from './store/use-company-store';
import { SideMenu } from './components/side-menu/side-menu.component';
import { Layout } from './layout.component.tsx';

import styles from './company.module.sass';


export const Company = observer(() => {
  const companyStore = useCompanyStore();
  const contactsStore = useContactStore();

  if (companyStore.isLoading || contactsStore.isLoading) return <div>Loading...</div>;
  if (companyStore.error || contactsStore.error) return <div>{companyStore.error || contactsStore.error}</div>;
  if (!companyStore.company || !contactsStore.contacts) return <div>No company data</div>;

  return (
    <section className={styles.company}>
      <SideMenu />
      <Layout
        company={companyStore.company}
        contacts={contactsStore.contacts}
      />
    </section>
  );
});
