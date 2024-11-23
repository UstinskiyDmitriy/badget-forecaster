import styles from './BudgetSummary.module.css';

type BudgetSummaryProps = {
  totalIncome: number;
  totalExpense: number;
};

export default function BudgetSummary({ totalIncome, totalExpense }: BudgetSummaryProps) {
  const balance = totalIncome - totalExpense;

  return (
    <div className={styles.summary}>
      <div className={styles.item}>
        <span>Доходы:</span>
        <span className={styles.income}>₽{totalIncome.toFixed(2)}</span>
      </div>
      <div className={styles.item}>
        <span>Расходы:</span>
        <span className={styles.expense}>-₽{totalExpense.toFixed(2)}</span>
      </div>
      <div className={styles.item}>
        <span>Баланс:</span>
        <span className={balance >= 0 ? styles.balancePositive : styles.balanceNegative}>
        ₽{balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
