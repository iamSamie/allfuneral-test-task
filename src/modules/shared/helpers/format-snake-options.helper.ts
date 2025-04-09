import { Option } from '../types';

export const formatSnakeOptions = (items: string[]): Option[] => {
  return items.map((item) => ({
    value: item,
    label: item
      .split('_')
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1)
          : word.toLowerCase()
      )
      .join(' ')
  }));
};
