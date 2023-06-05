import React, { forwardRef } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({ onClose }: ModalProps, ref) {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles['modal-wrap']} ref={ref}>
        <div className={styles.close}>
          <button type="button" onClick={handleClose}>
            <img src="/icons/close.png" alt="close" />
          </button>
        </div>
        <div>
          <h2>Title</h2>
          <p>Lorem ipsum dolor sit amet consectetur. Varius nunc aliquam nullam vitae.</p>
        </div>
      </div>
    </div>
  );
});

Modal.defaultProps = {
  onClose: undefined,
};

export default Modal;
