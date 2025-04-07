import {
  useRef,
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from 'react';
import clsx from 'clsx';

import { SvgIcon } from '@/modules/shared/components';
import { Option } from '@/modules/shared/types';

import styles from './select.module.sass';


interface SelectProps {
  className?: string;
  options: Option[];
  isMultiple?: boolean;
  placeholder: string;
  selected: Option[] | Option | null;
  onSelect: Dispatch<SetStateAction<Option[] | Option | null>>;
}

export const Select = (props: SelectProps) => {
  const {
    className,
    options,
    isMultiple = false,
    placeholder,
    selected,
    onSelect,
    ...rest
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleOptionClick = (option: Option) => {
    onSelect((prev) => {
      if (!isMultiple) {
        setIsOpen(false);
        return option;
      }

      const selectedArray = Array.isArray(prev) ? prev : [];
      const exists = selectedArray.some((o) => o.value === option.value);

      return exists
        ? selectedArray.filter((o) => o.value !== option.value)
        : [...selectedArray, option];
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;

    if (!isOpen && (key === 'Enter' || key === ' ')) {
      event.preventDefault();
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
        event.preventDefault();
        handleOptionClick(options[focusedIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const displayLabel = (() => {
    if (isMultiple) {
      return Array.isArray(selected) && selected.length > 0
        ? selected.map((o) => o.label).join(', ')
        : placeholder;
    }

    return (selected as Option)?.label || placeholder;
  })();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={clsx(styles.wrapper__select, className)}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span>{displayLabel}</span>
        <SvgIcon
          name="arrow-down"
          className={clsx(
            styles.wrapper__arrow,
            { [styles['wrapper__arrow--open']]: isOpen }
          )}
        />
      </button>
      {isOpen && (
        <ul role="listbox" className={styles.wrapper__options_list}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              tabIndex={-1}
              aria-selected={
                isMultiple
                  ? Array.isArray(selected) && selected.some((o) => o.value === option.value)
                  : (selected as Option)?.value === option.value
              }
              onClick={() => handleOptionClick(option)}
              className={clsx(styles.wrapper__options_list__option, {
                [styles.focused]: index === focusedIndex,
                [styles.selected]: isMultiple
                  ? Array.isArray(selected) && selected.some((o) => o.value === option.value)
                  : (selected as Option)?.value === option.value,
              })}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
