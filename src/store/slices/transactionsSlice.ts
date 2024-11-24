import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { Transaction } from '../../types/types';


type TransactionsState = {
  list: Transaction[];
  initialBalance: number
};


const LOCAL_STORAGE_KEY = 'transactions';
const INITIAL_BALANCE = 'initialbalance'
const initialState: TransactionsState = {
  list: loadFromLocalStorage<Transaction[]>(LOCAL_STORAGE_KEY) || [],
  initialBalance: loadFromLocalStorage<number>(INITIAL_BALANCE) ?? 0,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addInitialBalance: (state, action:PayloadAction<number>) => {
      state.initialBalance = action.payload
     saveToLocalStorage(INITIAL_BALANCE, state.initialBalance)
    },
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

export const { addTransaction, deleteTransaction,addInitialBalance  } = transactionsSlice.actions;

export default transactionsSlice.reducer;
