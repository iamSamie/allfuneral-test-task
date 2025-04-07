
import styles from './side-menu.module.sass'
import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

export const SideMenu = () => {
  return (
    <div className={styles.sidemenu}>
      <div className={styles.sidemenu__title}>
        <h2>Oak Tree Cemetery</h2>
        <h4>Process Manager</h4>
        <hr className={styles.sidemenu__title__hr}/>
      </div>
      <div className={styles.sidemenu__buttons}>
        <Button
          appearance="filled"
          icon={<SvgIcon name="company" />}
        >
          Organizations
        </Button>
        <Button
          appearance="outline"
          icon={<SvgIcon name="contractor" />}
        >
          Contractors
        </Button>
        <Button
          appearance="outline"
          icon={<SvgIcon name="clients" />}
        >
          Clients
        </Button>
      </div>
      <div className={styles.sidemenu__copyright}>
        <h4>All Funeral Services © 2015-2025</h4>
      </div>
    </div>
  );
};
