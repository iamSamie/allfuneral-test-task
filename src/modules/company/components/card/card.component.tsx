import { ReactNode } from 'react';

import styles from './card.module.sass';

interface CardProps {
  title: string;
  ActionButton: ReactNode;
}

export const Card = (props: CardProps) => {
  const {
    title,
    ActionButton,
  } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__title}>
        <h4>{title}</h4>
        {ActionButton}
      </div>
    </div>
  );
};
