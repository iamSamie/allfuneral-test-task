import { ReactNode } from 'react';

import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component';

import styles from '../card/card.module.sass';


interface DetailsCardProps {
  title: string;
  isEditMode: boolean;
  onChangeMode: () => void;
  rows: {
    label: string;
    value: ReactNode;
  }[];
}

export const DetailsCard = (props: DetailsCardProps) => {
  const {
    rows,
    title,
    isEditMode,
    onChangeMode,
  } = props;

  if (isEditMode) {

  }

  return (
    <Card
      title={title}
      ActionButton={
        <Button
          appearance="flattened"
          icon={<SvgIcon name="edit" />}
          onClick={onChangeMode}
        >
          Edit
        </Button>
      }
    >
      <div className={styles.details}>
        {rows.map((row, idx) => (
          <div key={idx} className={styles.details__row}>
            <span className={styles.details__label}>{row.label}</span>
            <span className={styles.details__value}>{row.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
