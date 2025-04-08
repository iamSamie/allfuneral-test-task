import React from 'react';

import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import styles from './photo.module.sass';


type PhotoProps = {
  thumbpath: string;
  name: string;
  onDelete: () => void;
};

export const Photo: React.FC<PhotoProps> = ({ thumbpath, name, onDelete }) => {
  return (
    <div className={styles.photo}>
      <img src={thumbpath} alt={name} className={styles.photo__image} />
      <Button
        appearance="only_icon"
        className={styles.photo__delete}
        onClick={onDelete}
      >
        <SvgIcon name="trash" />
      </Button>
    </div>
  );
};