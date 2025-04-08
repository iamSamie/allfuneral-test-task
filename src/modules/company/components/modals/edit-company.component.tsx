import { Modal } from '@/modules/shared/components/modal';
import { Button, Input } from '@/modules/shared/ui';

import { useCompanyStore } from '../../store/use-company-store';

import styles from './modals.module.sass';
import { useState } from 'react';

interface RemoveCompanyProps {
  onClose: () => void;
}

export const EditCompany= (props: RemoveCompanyProps) => {
  const { onClose } = props;

  const store = useCompanyStore();
  const [editValue, setEditValue] = useState(store.company?.name ?? '');

  const updateCompany = async (body: Record<'name', string>) => {
    try {
      await store.updateCompany('12', body);
    } catch (error) {
      console.error('Error updating company:', error);
      alert('Failed to update company');
    }
  };

  const handleEdit = () => {
    updateCompany({ name: editValue })
      .then(() => onClose());
  }

  return (
    <Modal
      title="Specify the Organization's name"
      onClose={onClose}
    >
      <Input
        value={editValue}
        onChange={(event) => setEditValue(event.target.value)}
        defaultValue={store.company?.name}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <Button
          appearance="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          appearance="filled"
          onClick={handleEdit}
        >
          Save changes
        </Button>
      </div>
    </Modal>
  );
};
