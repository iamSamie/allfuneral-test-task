import { useState } from 'react';

import { Contacts, useContactStore } from '@/modules/contacts';
import { formatDate, formatSnakeOptions } from '@/modules/shared/helpers';
import { Option } from '@/modules/shared/types';

import { DetailsCard } from './components/cards/details-card.component';
import { PhotoCard } from './components/cards/photo-card.component';
import { Header } from './components/header/header.component';
import { Company } from './types';

import styles from './layout.module.sass';
import { Input, Select } from '@/modules/shared/ui';
import { useCompanyStore } from '@/modules/company/store/use-company-store.ts';


interface LayoutProps {
  company: Company;
  contacts: Contacts;
}

export const Layout = (props : LayoutProps) => {
  const {
    company,
    contacts,
  } = props;

  const companyStore = useCompanyStore();
  const contactsStore = useContactStore();

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

  const handleSaveCompanyChanges = async () => {
    try {
      await companyStore.updateCompany(company.id, {
        type: Array.isArray(companyType)
          ? companyType.map((o) => o.value)
          : [companyType?.value],
        businessEntity,
        contract: {
          ...company.contract,
          no: contractNo,
          issue_date: contractDate,
        },
      });

      setIsEditCompany(false);
    } catch (e) {
      console.error('Failed to save company changes:', e);
    }
  };

  const handleSaveContactChanges = async () => {
    try {
      await contactsStore.updateContact(contacts.id, {
        firstname,
        lastname,
        phone,
        email,
      })

      setIsEditContact(false);
    } catch (e) {
      console.error('Failed to update contact', e);
    }
  };

  const resetCompanyChanges = () => {
    setCompanyType(formatSnakeOptions(company.type));
    setBusinessEntity(company.businessEntity);
    setContractNo(company.contract.no);
    setContractDate(formatDate(company.contract.issue_date));
  };

  const resetContactChanges = () => {
    setFirstname(contacts.firstname);
    setLastname(contacts.lastname);
    setPhone(contacts.phone);
    setEmail(contacts.email);
  };

  return (
    <div className={styles.layout}>
      <Header name={company.name} />
      <div className={styles.layout__cards_wrapper}>
        <DetailsCard
          title="Company Details"
          isEditMode={isEditCompany}
          onChangeMode={handleChangeCompanyMode}
          onSave={handleSaveCompanyChanges}
          onCancel={resetCompanyChanges}
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
          onSave={handleSaveContactChanges}
          onCancel={resetContactChanges}
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
  );
};
