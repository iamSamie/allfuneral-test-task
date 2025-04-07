import { SvgIcon } from '@/modules/shared/components';

import styles from './company.module.sass';
import { Button } from '@/modules/shared/ui';
import { useNavigate } from 'react-router-dom';


export const Company = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.company}>
      <div className={styles.company__header}>
        <Button
          appearance="arrow"
          className={styles.company__back}
          onClick={() => navigate(-1)}
        >
          <SvgIcon name="arrow-left" />
        </Button>
        <h1>Eternal Rest Funeral Home</h1>
        <div className={styles.company__icons}>
          <button>
            <SvgIcon name="edit" />
          </button>
          <button>
            <SvgIcon name="red-trash" />
          </button>
        </div>
      </div>
    </section>
  );
};
