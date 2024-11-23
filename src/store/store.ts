import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import goalsReducer  from './slices/goalsSlice'
import budgetReducer from './slices/budgedSlice'
const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    goals: goalsReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
