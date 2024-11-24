// src/store/slices/goalsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
}

interface GoalsState {
  list: Goal[];
  
}

const loadGoalsFromLocalStorage = (): Goal[] => {
  const savedGoals = localStorage.getItem('goals');
  return savedGoals ? JSON.parse(savedGoals) : [];
};

const initialState: GoalsState = {
  list: loadGoalsFromLocalStorage(),
  
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {

    addGoal(state, action: PayloadAction<Goal>) {
      state.list.push(action.payload);
      localStorage.setItem('goals', JSON.stringify(state.list));
    },
    removeGoal(state, action: PayloadAction<string>) {
      state.list = state.list.filter((goal) => goal.id !== action.payload);
      localStorage.setItem('goals', JSON.stringify(state.list));
    },
    updateGoal(
      state,
      action: PayloadAction<{ id: string; currentAmount: number }>
    ) {
      const goal = state.list.find((goal) => goal.id === action.payload.id);
      if (goal) {
        goal.currentAmount = action.payload.currentAmount;
        localStorage.setItem('goals', JSON.stringify(state.list));
      }
    },
  },
});

export const { addGoal, removeGoal, updateGoal} = goalsSlice.actions;
export default goalsSlice.reducer;
