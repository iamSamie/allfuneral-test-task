import { useState } from 'react';
import { Select } from '@/modules/shared/ui';
import { Option } from '@/modules/shared/types';

export function App() {
  const [selected, setSelected] = useState<Option[] | Option | null>([]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '200px', width: '400px', marginLeft: '200px' }}>
      <Select
        options={[
          { value: 'строка1', label: 'строка1' },
          { value: 'строка2', label: 'строка2' },
          { value: 'строка3', label: 'строка3' },
          { value: 'строка4', label: 'строка4' },
          { value: 'строка5', label: 'строка5' },
        ]}
        placeholder="Select something"
        isMultiple
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
}