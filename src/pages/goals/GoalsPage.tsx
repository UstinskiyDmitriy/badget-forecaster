import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GoalsPage.module.css';
import { RootState } from '../../store/store';
import { addGoal, removeGoal, updateGoal } from '../../store/slices/goalsSlice';
import Modal from '../../components/modal/Modal';

export default function GoalPage() {
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<string | null>(null); 

  const dispatch = useDispatch();
  const goals = useSelector((state: RootState) => state.goals.list);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetAmount) return;

    
    dispatch(
      addGoal({
        id: Date.now().toString(), 
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount)
      })
    );

    setNewGoal({ title: '', targetAmount: '', currentAmount: '' });
  };

  const handleDeleteGoal = (id: string) => {
    dispatch(removeGoal(id));
  };

  const handleOpenModal = (id: string) => {
    setGoalToUpdate(id);
    setIsModalOpen(true); 
  };

  const handleUpdateGoal = (newAmount: number) => {
    if (goalToUpdate) {
      dispatch(updateGoal({ id: goalToUpdate, currentAmount: newAmount }));
    }
  };

  return (
    <div className={styles.page}>
      <h1>Цели</h1>

      <form className={styles.form} onSubmit={handleAddGoal}>
        <div className={styles.inputGroup}>
          <label>Название цели:</label>
          <input
            type="text"
            name="title"
            value={newGoal.title}
            onChange={handleChange}
            placeholder="Название цели"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Целевая сумма:</label>
          <input
            type="number"
            name="targetAmount"
            value={newGoal.targetAmount}
            onChange={handleChange}
            placeholder="Целевая сумма"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Текущая сумма:</label>
          <input
            type="number"
            name="currentAmount"
            value={newGoal.currentAmount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.addButton}>Добавить цель</button>
      </form>


      <div className={styles.goalsList}>
        {goals.map((goal) => (
          <div key={goal.id} className={styles.goalItem}>
            <h2>{goal.title}</h2>
            <p>Целевая сумма: {goal.targetAmount} ₽</p>
            <p>Текущая сумма: {goal.currentAmount} ₽</p>
            <p>Прогресс: {Math.min((goal.currentAmount / goal.targetAmount) * 100, 100).toFixed(2)}%</p>
            <div className={styles.goalActions}>
              <button onClick={() => handleOpenModal(goal.id)} className={styles.updateButton}>Обновить</button>
              <button onClick={() => handleDeleteGoal(goal.id)} className={styles.deleteButton}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      {goalToUpdate && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateGoal}
          currentAmount={goals.find((goal) => goal.id === goalToUpdate)?.currentAmount || 0}
        />
      )}
    </div>
  );
}
