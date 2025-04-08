import { useNavigate } from 'react-router-dom';

import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import styles from './header.module.sass';


interface HeaderProps {
  name: string;
}

export const Header = (props: HeaderProps) => {
  const { name } = props;

  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Button
        appearance="arrow"
        className={styles.header__back}
        onClick={() => navigate(-1)}
      >
        <SvgIcon name="arrow-left"/>
      </Button>
      <h1 className={styles.header__title}>{name}</h1>
      <div className={styles.header__icons}>
        <button className={styles.header__icon_button}>
          <SvgIcon name="edit"/>
        </button>
        <button className={styles.header__icon_button}>
          <SvgIcon name="red-trash"/>
        </button>
      </div>
    </div>
  );
};
