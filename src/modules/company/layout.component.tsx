import { CompanyDetails } from './components/cards/company-details.component';
import { ContactsDetail } from './components/cards/contacts-detail.component';
import { PhotoCard } from './components/cards/photo-card.component';
import { Header } from './components/header/header.component';
import { Company } from './types';

import styles from './layout.module.sass';

interface LayoutProps {
  company: Company;
}

export const Layout = ({ company } : LayoutProps) => {

  return (
    <div className={styles.layout}>
      <Header name={company.name} />
      <div className={styles.layout__cards_wrapper}>
        <CompanyDetails />
        <ContactsDetail />
        <PhotoCard photos={company.photos} />
      </div>
    </div>
  )
};
