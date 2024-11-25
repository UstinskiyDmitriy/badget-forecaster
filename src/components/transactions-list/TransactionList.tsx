import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../../store/slices/transactionsSlice';
import styles from './TransactionList.module.css';
import { RootState } from '../../store/store';


export default function TransactionList() {
  const transactions = useSelector((state: RootState) => state.transactions.list);
  const dispatch = useDispatch();

  if (transactions.length === 0) {
    return <p className={styles.emptyMessage}>Транзакций пока нет.</p>;
  }

  return (
    <div>
   
      <div className={`${styles.tableContainer} ${styles.desktopOnly}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Категория</th>
              <th>Описание</th>
              <th>Сумма</th>
              <th>Тип</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className={transaction.type === 'income' ? styles.income : styles.expense}
              >
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description || '-'}</td>
                <td>₽{transaction.amount.toFixed(2)}</td>
                <td>{transaction.type === 'income' ? 'Доход' : 'Расход'}</td>
                <td>
                  <button onClick={() => dispatch(deleteTransaction(transaction.id))} className={styles.delete_button}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Карточки для мобильных устройств */}
      <div className={styles.mobileOnly}>
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`${styles.card} ${
              transaction.type === 'income' ? styles.income : styles.expense
            }`}
          >
            <p><strong>Дата:</strong> {transaction.date}</p>
            <p><strong>Категория:</strong> {transaction.category}</p>
            <p><strong>Описание:</strong> {transaction.description || '-'}</p>
            <p><strong>Сумма:</strong> ₽{transaction.amount.toFixed(2)}</p>
            <p><strong>Тип:</strong> {transaction.type === 'income' ? 'Доход' : 'Расход'}</p>
            <button onClick={() => dispatch(deleteTransaction(transaction.id))} className={styles.delete_button}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
