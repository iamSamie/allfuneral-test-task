import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component';

export const ContactsDetail = () => {
  return (
    <Card
      title="Contacts"
      ActionButton={
        <Button appearance="flattened" icon={<SvgIcon name="edit" />}>
          Edit
        </Button>
      }
    >dfgdrgd</Card>
  );
};
