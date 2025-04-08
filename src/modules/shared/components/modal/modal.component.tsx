import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.sass';


interface ModalProps {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = (props: ModalProps) => {
  const {
    title,
    onClose,
    children,
  } = props;

  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return createPortal(
    <div
      className={styles.modal}
      onClick={handleBackgroundClick}
    >
      <div className={styles.modal__content}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>,
    document.getElementById('main') as HTMLElement
  );
};
