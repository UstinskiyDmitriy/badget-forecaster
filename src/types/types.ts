export type Transaction = {
  id: string;
  amount: number; 
  type: 'income' | 'expense'; 
  category: string; 
  description: string; 
  date: string; 
};

export type Goal = {
  id: string;
  name: string; 
  targetAmount: number; 
  currentAmount: number; 
  deadline: string; 
};

