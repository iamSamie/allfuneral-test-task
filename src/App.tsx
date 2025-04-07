import { useState } from 'react';
import { Select } from '@/modules/shared/ui';

export function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

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
        placeholder="строчка"
        selected={selectedOption}
        onSelect={handleSelect}
      />
    </div>
  );
}