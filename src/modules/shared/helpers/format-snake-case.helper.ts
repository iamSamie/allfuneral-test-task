export const formatSnakeCaseToString = (items: string[]): string => {
  return items
    .map((item) =>
      item
        .split('_')
        .map((word, index) =>
          index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word.toLowerCase()
        )
        .join(' ')
    )
    .join(', ');
};
