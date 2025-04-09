import { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component';

import styles from '../card/card.module.sass';


interface Row {
  label: string;
  value: string;
  editComponent?: ReactNode;
}

interface DetailsCardProps {
  title: string;
  rows: Row[];
  isEditMode: boolean;
  onChangeMode: () => void;
}

export const DetailsCard = observer((props: DetailsCardProps) => {
  const {
    rows,
    title,
    isEditMode,
    onChangeMode,
  } = props;

  return (
    <Card
      title={title}
      ActionButton={
        !isEditMode ? (
          <Button
            appearance="flattened"
            icon={<SvgIcon name="edit"/>}
            onClick={onChangeMode}
          >
            Edit
          </Button>
        ) : (
          <div className={styles.buttons}>
            <Button
              appearance="flattened"
              icon={<SvgIcon name="check"/>}
              onClick={onChangeMode}
            >
              Save changes
            </Button>
            <Button
              appearance="flattened"
              icon={<SvgIcon name="x"/>}
              onClick={onChangeMode}
            >
              Cancel
            </Button>
          </div>
        )
      }
    >
      <div className={styles.details}>
        {rows.map((row, idx) => (
          <div key={idx} className={styles.details__row}>
            <span className={styles.details__label}>{row.label}</span>
            {isEditMode && row.editComponent
              ? row.editComponent
              : <span className={styles.details__value}>{row.value}</span>}
          </div>
        ))}
      </div>
    </Card>
  );
});
