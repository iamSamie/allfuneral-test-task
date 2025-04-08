import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { PhotoCard } from './components/cards/photo-card.component.tsx';
import { Header } from './components/header/header.component.tsx';
import { Card } from './components/card/card.component.tsx';
import { Company } from './types.ts';

import styles from './layout.module.sass';

interface LayoutProps {
  company: Company;
}

export const Layout = ({ company } : LayoutProps) => {

  return (
    <div className={styles.layout}>
      <Header name={company.name} />
      <div className={styles.layout__cards_wrapper}>
        <Card
          title="Company Details"
          ActionButton={
            <Button
              appearance="outline"
              icon={<SvgIcon name="edit" />}
              className={styles.layout__cards_wrapper__action_button}
            >
              Edit
            </Button>
          }
        >dfgdrgd</Card>
        <Card
          title="Contacts"
          ActionButton={
            <Button
              appearance="outline"
              icon={<SvgIcon name="edit" />}
              className={styles.layout__cards_wrapper__action_button}
            >
              Edit
            </Button>
          }
        >dfgdrgd</Card>
        <PhotoCard photos={company.photos} />
      </div>
    </div>
  )
};
