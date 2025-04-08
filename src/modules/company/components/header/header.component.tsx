import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { RemoveCompany } from '../modals/remove-company.component';
import { useCompanyStore } from '../../store/use-company-store';

import styles from './header.module.sass';


interface HeaderProps {
  name: string;
}

export const Header = (props: HeaderProps) => {
  const { name } = props;

  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const navigate = useNavigate();
  const store = useCompanyStore();

  const handleCloseRemoveCompany = () => {
    setIsOpenRemove(false);
  }

  const deleteCompany = async () => {
    await store.deleteCompany('12');
  };

  const handleCloseEditCompany = () => {
    setIsOpenEdit(false);
  };

  const updateCompany = async () => {
    try {
      await store.updateCompany('12', { name: 'Eternal Rest Funeral Home 123' });
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Failed to update company');
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Button
          appearance="arrow"
          className={styles.header__back}
          onClick={() => navigate(-1)}
        >
          <SvgIcon name="arrow-left"/>
        </Button>
        <h1 className={styles.header__title}>{name}</h1>
        <div className={styles.header__icons}>
          <button
            className={styles.header__icon_button}
            onClick={() => setIsOpenEdit(true)}
          >
            <SvgIcon name="edit"/>
          </button>
          <button
            className={styles.header__icon_button}
            onClick={() => setIsOpenRemove(true)}
          >
            <SvgIcon name="red-trash"/>
          </button>
        </div>
      </div>
      {isOpenRemove && <RemoveCompany onClose={handleCloseRemoveCompany} onRemove={deleteCompany} />}
    </>
  );
};
