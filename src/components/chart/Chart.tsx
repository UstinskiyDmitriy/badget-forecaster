import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.css'
type BudgetChartProps = {
  totalIncome: number;
  totalExpense: number;
};

export default function BudgetChart({ totalIncome, totalExpense }: BudgetChartProps) {
  const data = [
    { name: 'Доходы', value: totalIncome },
    { name: 'Расходы', value: totalExpense },
  ];

  const COLORS = ['#4caf50', '#f44336'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer className={styles.chartContainer}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
            cursor='pointer'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
