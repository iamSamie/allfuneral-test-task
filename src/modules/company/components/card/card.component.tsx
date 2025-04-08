import { ReactNode } from 'react';

import styles from './card.module.sass';


interface CardProps {
  title: string;
  children: ReactNode;
  ActionButton: ReactNode;
}

export const Card = (props: CardProps) => {
  const {
    title,
    children,
    ActionButton,
  } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__title}>
        <h4>{title}</h4>
        {ActionButton}
      </div>
      {children}
    </div>
  );
};
