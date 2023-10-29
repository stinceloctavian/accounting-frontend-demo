import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, API_USER, API_PASSWORD } from '../../config';
import { RootState } from '../store';
import type { Invoice } from './invoicesSlice';

export const fetchInvoices = createAsyncThunk<Invoice[], { page?: number; limit?: number }, { rejectValue: string }>(
  'invoices/fetchInvoices',
  async ({ page = 1, limit = 100 }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Basic ${btoa(`${API_USER}:${API_PASSWORD}`)}`,
        },
      };

      const { data } = await axios.get(
        `${API_URL}/documents?search=type:invoice&page=${page}&limit=${limit}`,
        config
      );

      return data.data as Invoice[];
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
      const { invoices } = api.getState() as RootState;

      if (invoices.status === 'succeeded') {
        return false;
      }
    },
  }
);
