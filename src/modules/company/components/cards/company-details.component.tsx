import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component.tsx';

import styles from '../card/card.module.sass';


export const CompanyDetails = () => {
  return (
    <Card
      title="Company Details"
      ActionButton={
        <Button appearance="flattened" icon={<SvgIcon name="edit" />}>
          Edit
        </Button>
      }
    >
      <div className={styles.details}>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Agreement:</span>
          <span className={styles.details__value}>1624/2-24&nbsp;/&nbsp;03.12.2024</span>
        </div>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Business entity:</span>
          <span className={styles.details__value}>Partnership</span>
        </div>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Company type:</span>
          <span className={styles.details__value}>Funeral Home, Logistics services</span>
        </div>
      </div>
    </Card>
  );
};
