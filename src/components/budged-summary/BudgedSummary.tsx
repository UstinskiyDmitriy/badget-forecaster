import { useSelector } from "react-redux";
import styles from "./BudgetSummary.module.css";
import { RootState } from "../../store/store";
import { useState } from "react";
import BalanceDropdown from "../balance-dropdown/BalanceDropdown";

type BudgetSummaryProps = {
  totalIncome: number;
  totalExpense: number;
};

export default function BudgetSummary({
  totalIncome,
  totalExpense,
}: BudgetSummaryProps) {
  const initialBalanace = useSelector(
    (state: RootState) => state.transactions.initialBalance
  );
  const balance = initialBalanace + (totalIncome - totalExpense);

  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(!isOpen);
  };
  return (
    <div className={styles.summary}>
      <div className={styles.item}>
        {isOpen && (
          <div className={styles.dropdown}>
            <BalanceDropdown />
          </div>
        )}
     
        <span>Баланс:</span>
        
        <span
          className={
            balance >= 0 ? styles.balancePositive : styles.balanceNegative
          }
        >
          ₽{balance.toFixed(2)}
        </span>
        <button onClick={open}>Обновить баланс</button>
      </div>

      <div className={styles.item}>
        <span>Доходы:</span>
        <span className={styles.income}>₽{totalIncome.toFixed(2)}</span>
      </div>

      <div className={styles.item}>
        <span>Расходы:</span>
        <span className={styles.expense}>-₽{totalExpense.toFixed(2)}</span>
      </div>
    </div>
  );
}
