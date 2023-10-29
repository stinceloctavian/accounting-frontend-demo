import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchBills } from './billsThunks';

export type Bill = {
  id: number;
  amount: number;
  due_at: string;
  document_number: string;
  status?: string;
  contact_email?: string;
  contact_name?: string;
  contact_phone?: string;
  contact_address?: string;
  notes?: string;
}

interface BillsState {
  billsData: Bill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Custom type
  error: string | null;
}

const initialState: BillsState = {
  billsData: [],
  status: 'idle',
  error: null,
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBills.fulfilled, (state, action: PayloadAction<Bill[]>) => {
        state.status = 'succeeded';
        state.billsData = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export const bills = (state: RootState) => state.bills;
export default billsSlice.reducer;
