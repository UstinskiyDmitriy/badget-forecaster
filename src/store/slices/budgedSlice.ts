import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BudgetState {
  balance: number;
}

const initialState: BudgetState = {
  balance: 1000, 
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    updateBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
  },
});

export const { updateBalance } = budgetSlice.actions;
export default budgetSlice.reducer;
