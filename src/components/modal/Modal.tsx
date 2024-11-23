import React, { useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAmount: number) => void;
  currentAmount: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, currentAmount }) => {
  const [newAmount, setNewAmount] = useState<number>(currentAmount);

  const handleSave = () => {
    if (!isNaN(newAmount) && newAmount >= 0) {
      onSave(newAmount); 
      onClose(); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Обновить текущую сумму</h2>
        <input
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(parseFloat(e.target.value))}
          placeholder="Введите сумму"
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Отменить
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
