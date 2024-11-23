import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { Transaction } from '../../types/types';


type TransactionsState = {
  list: Transaction[];
};

const LOCAL_STORAGE_KEY = 'transactions';

const initialState: TransactionsState = {
  list: loadFromLocalStorage<Transaction[]>(LOCAL_STORAGE_KEY) || [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.list.push(action.payload);
      saveToLocalStorage(LOCAL_STORAGE_KEY, state.list);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((transaction) => transaction.id !== action.payload);
      saveToLocalStorage(LOCAL_STORAGE_KEY, state.list);
    },
  },
});

export const { addTransaction, deleteTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
