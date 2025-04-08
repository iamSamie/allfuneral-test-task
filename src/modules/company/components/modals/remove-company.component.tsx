import { Modal } from '@/modules/shared/components/modal';
import { Button } from '@/modules/shared/ui';

import { useCompanyStore } from '../../store/use-company-store';

import styles from './modals.module.sass';

interface RemoveCompanyProps {
  onClose: () => void;
}

export const RemoveCompany= (props: RemoveCompanyProps) => {
  const { onClose } = props;

  const store = useCompanyStore();

  const deleteCompany = async () => {
    await store.deleteCompany('12');
  };

  const handleRemove = () => {
    deleteCompany()
      .then(() => onClose());
  }

  return (
    <Modal
      title="Remove the Organization?"
      onClose={onClose}
    >
      <h4>Are you sure you want to remove this Organozation?</h4>
      <div className={styles.buttons}>
        <Button
          appearance="outline"
          onClick={onClose}
        >
          No
        </Button>
        <Button
          appearance="filled"
          onClick={handleRemove}
        >
          Yes, remove
        </Button>
      </div>
    </Modal>
  );
};
