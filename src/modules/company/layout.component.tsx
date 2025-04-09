import { useState } from 'react';

import { Contacts } from '@/modules/contacts';
import { formatDate, formatSnakeOptions } from '@/modules/shared/helpers';
import { Option } from '@/modules/shared/types';

import { DetailsCard } from './components/cards/details-card.component';
import { PhotoCard } from './components/cards/photo-card.component';
import { Header } from './components/header/header.component';
import { Company } from './types';

import styles from './layout.module.sass';
import { Input, Select } from '@/modules/shared/ui';


interface LayoutProps {
  company: Company;
  contacts: Contacts;
}

export const Layout = ({ company, contacts } : LayoutProps) => {
  const [isEditCompany, setIsEditCompany] = useState(false);
  const [isEditContact, setIsEditContact] = useState(false);

  const formattedOptions = formatSnakeOptions(company.type);

  const [companyType, setCompanyType] = useState<Option | Option[]>(() =>
    formatSnakeOptions(company.type)
  );
  const [businessEntity, setBusinessEntity] = useState(company.businessEntity);
  const [contractNo, setContractNo] = useState(company.contract.no);
  const [contractDate, setContractDate] = useState(() => formatDate(company.contract.issue_date));

  const [firstname, setFirstname] = useState(contacts.firstname);
  const [lastname, setLastname] = useState(contacts.lastname);
  const [phone, setPhone] = useState(contacts.phone);
  const [email, setEmail] = useState(contacts.email);


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
              value: `${contractNo} / ${contractDate}`,
              editComponent: (
                <>
                  <Input
                    value={contractNo}
                    onChange={(e) => setContractNo(e.target.value)}
                    placeholder="Contract No"
                  />
                  <span className={styles.label}>Date:</span>
                  <Input
                    value={contractDate}
                    onChange={(e) => setContractDate(e.target.value)}
                    placeholder="Issue Date"
                  />
                </>
              ),
            },
            {
              label: 'Business entity:',
              value: businessEntity,
              editComponent: (
                <Input
                  value={businessEntity}
                  onChange={(e) => setBusinessEntity(e.target.value)}
                />
              ),
            },
            {
              label: 'Company type:',
              value: Array.isArray(companyType)
                ? companyType.map((t) => t.label).join(', ')
                : companyType?.label || '',
              editComponent: (
                <Select
                  options={formattedOptions}
                  selected={companyType}
                  onSelect={setCompanyType}
                  isMultiple
                />
              ),
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
              value: `${firstname} ${lastname}`,
              editComponent: (
                <Input
                  value={`${firstname} ${lastname}`}
                  onChange={(e) => {
                    const [newFirstname, ...rest] = e.target.value.trim().split(' ');
                    setFirstname(newFirstname);
                    setLastname(rest.join(' '));
                  }}
                  placeholder="Firstname Lastname"
                />
              ),
            },
            {
              label: 'Phone number:',
              value: phone,
              editComponent: (
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              ),
            },
            {
              label: 'E-mail:',
              value: email,
              editComponent: (
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ),
            },
          ]}
        />
        <PhotoCard photos={company.photos} />
      </div>
    </div>
  )
};
