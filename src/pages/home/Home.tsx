import BudgetSummary from '../../components/budged-summary/BudgedSummary';
import TransactionForm from '../../features/transaction-form/TransactionForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Chart from '../../components/chart/Chart';


export default function Home() {

  const transactions = useSelector((state: RootState) => state.transactions.list);
  
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);


  return (
    <div>
      <h2>Обзор бюджета</h2>
      
      <BudgetSummary totalIncome={totalIncome} totalExpense={totalExpense} />

      <h2>График бюджета</h2>
      <Chart totalIncome={totalIncome} totalExpense={totalExpense}/>

      <h3>Добавить транзакцию</h3>
      <TransactionForm />
    </div>
  );
}
