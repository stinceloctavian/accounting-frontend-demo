import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, API_USER, API_PASSWORD } from '../../config';
import { RootState } from '../store';
import type { Bill } from './billsSlice';

export const fetchBills = createAsyncThunk<Bill[], { page?: number; limit?: number }, { rejectValue: string }>(
  'bills/fetchBills',
  async ({ page = 1, limit = 100 }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Basic ${btoa(`${API_USER}:${API_PASSWORD}`)}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/documents?search=type:bill&page=${page}&limit=${limit}`,
        config
      );

      return data.data as Bill[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue('An unknown error occurred.');
      }
    }
  },
  {
    condition: (_, api) => {
      const { bills } = api.getState() as RootState;

      if (bills.status === 'succeeded') {
        return false;
      }
    },
  }
);
