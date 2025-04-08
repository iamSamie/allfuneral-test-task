import { Button } from '@/modules/shared/ui';
import { SvgIcon } from '@/modules/shared/components';

import { Card } from '../card/card.component.tsx';

export const CompanyDetails = () => {
  return (
    <Card
      title="Company Details"
      ActionButton={
        <Button appearance="flattened" icon={<SvgIcon name="edit" />}>
          Edit
        </Button>
      }
    >dfgdrgd</Card>
  );
};
