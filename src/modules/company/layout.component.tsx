import { useState } from 'react';

import { Contacts } from '@/modules/contacts';
import { formatSnakeCaseToString } from '@/modules/shared/helpers';

import { DetailsCard } from './components/cards/details-card.component';
import { PhotoCard } from './components/cards/photo-card.component';
import { Header } from './components/header/header.component';
import { Company } from './types';

import styles from './layout.module.sass';

interface LayoutProps {
  company: Company;
  contacts: Contacts;
}

export const Layout = ({ company, contacts } : LayoutProps) => {
  const [isEditCompany, setIsEditCompany] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);

  const handleChangeCompanyMode = () => {
    setIsEditCompany(!isEditCompany);
  }
  const handleChangeContactMode = () => {
    setIsEditContact(!isEditContact);
  }

  return (
    <div className={styles.layout}>
      <Header name={company.name} />
      <div className={styles.layout__cards_wrapper}>
        <DetailsCard
          title="Company Details"
          isEditMode={isEditCompany}
          onChangeMode={handleChangeCompanyMode}
          rows={[
            {
              label: 'Agreement:',
              value: `${company.contract.no} / ${company.contract.issue_date}`,
            },
            {
              label: 'Business entity:',
              value: company.businessEntity,
            },
            {
              label: 'Company type:',
              value: formatSnakeCaseToString(company.type),
            },
          ]}
        />
        <DetailsCard
          title="Contacts"
          isEditMode={isEditContact}
          onChangeMode={handleChangeContactMode}
          rows={[
            {
              label: 'Responsible person:',
              value: `${contacts.firstname} ${contacts.lastname}`,
            },
            {
              label: 'Phone number:',
              value: contacts.phone,
            },
            {
              label: 'E-mail:',
              value: contacts.email,
            },
          ]}
        />
        <PhotoCard photos={company.photos} />
      </div>
    </div>
  )
};
