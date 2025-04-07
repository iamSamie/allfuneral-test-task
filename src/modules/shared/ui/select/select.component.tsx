import { useState, useRef, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import { SvgIcon } from '@/modules/shared/components';
import styles from './select.module.sass';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  options: Option[];
  placeholder: string;
  selected?: Option | null;
  onSelect?: (selected: Option) => void;
  onChange?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

export const Select = ({
  className,
  options,
  placeholder,
  selected,
  onSelect,
  onChange,
  ...rest
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    onSelect?.(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsOpen(true);
    } else if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleOptionClick(options[focusedIndex]);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }, []);

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
        <span>
          {selected?.label || placeholder}
        </span>
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
              aria-selected={selected?.value === option.value}
              onClick={() => handleOptionClick(option)}
              className={clsx(styles.wrapper__options_list__option, {
                [styles.focused]: index === focusedIndex,
                [styles.selected]: selected?.value === option.value,
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
