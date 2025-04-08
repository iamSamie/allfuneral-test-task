import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component';

import styles from '../card/card.module.sass';


export const ContactsDetail = () => {
  return (
    <Card
      title="Contacts"
      ActionButton={
        <Button appearance="flattened" icon={<SvgIcon name="edit" />}>
          Edit
        </Button>
      }
    >
      <div className={styles.details}>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Responsible person:</span>
          <span className={styles.details__value}>David Rosenberg</span>
        </div>
        <div className={styles.details__row}>
          <span className={styles.details__label}>Phone number:</span>
          <span className={styles.details__value}>+1 702 555 2345</span>
        </div>
        <div className={styles.details__row}>
          <span className={styles.details__label}>E-mail:</span>
          <span className={styles.details__value}>david_rosenberg88@gmail.com</span>
        </div>
      </div>
    </Card>
  );
};
