import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/slices/transactionsSlice';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import styles from './TransactionForm.module.css';

export default function TransactionForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    amount: '',
    type: 'income',
    category: '',
    description: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (selectedOption: any) => {
    setForm({ ...form, type: selectedOption.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.category) return;

    dispatch(
      addTransaction({
        id: uuidv4(),
        amount: parseFloat(form.amount),
        type: form.type as 'income' | 'expense',
        category: form.category,
        description: form.description,
        date: form.date,
      })
    );
    setForm({
      amount: '',
      type: 'income',
      category: '',
      description: '',
      date: '',
    });
  };

  const options = [
    { value: 'income', label: 'Доход' },
    { value: 'expense', label: 'Расход' },
  ];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label>
          Сумма:
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Введите сумму"
            required
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          Тип:
          <Select
            name="type"
            value={options.find((option) => option.value === form.type)}
            onChange={handleSelectChange}
            options={options}
            className={styles.react_select_container}
            classNamePrefix="react-select"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          Категория:
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Например, еда, транспорт"
            required
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          Описание:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Краткое описание (необязательно)"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label>
          Дата:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className={styles.date_input}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Добавить
        </button>
      </div>
    </form>
  );
}

