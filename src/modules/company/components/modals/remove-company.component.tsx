import { Modal } from '@/modules/shared/components/modal';
import { Button } from '@/modules/shared/ui';

import styles from './remove-company.module.sass';

interface RemoveCompanyProps {
  onClose: () => void;
  onRemove: () => void;
}

export const RemoveCompany= (props: RemoveCompanyProps) => {
  const {
    onClose,
    onRemove,
  } = props;

  const handleRemove = () => {
    onRemove();
    onClose();
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
