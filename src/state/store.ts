import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoices/invoicesSlice';
import billsSlice from './bills/billsSlice';

export const store = configureStore({
  reducer: {
    bills: billsSlice,
    invoices: invoicesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
