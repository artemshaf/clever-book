import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, SlicesName } from '@store';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { AxiosError } from 'axios';
import { RecoveryErrors } from '../../../types';

const Recovery = createAsyncThunk<unknown>(
  `${SlicesName.Recovery}/recovery`,
  async (_, { getState, rejectWithValue }) => {
    const {
      recovery: { data },
    } = getState() as RootState;

    try {
      const response = await api.post(`${ApiUrls.ResetPassword}`, { ...data });

      return response;
    } catch (error) {
      const { response } = error as AxiosError;

      return rejectWithValue(response);
    }
  }
);

const RecoveryCheck = createAsyncThunk<unknown>(
  `${SlicesName.Recovery}/recovery-check`,
  async (_, { getState, rejectWithValue }) => {
    const {
      recovery: { data },
    } = getState() as RootState;

    try {
      const response = await api.post(`${ApiUrls.RecoveryPassword}`, { email: data.email });

      return response;
    } catch (error) {
      const { response } = error as AxiosError;

      if (response?.status === 400) {
        return rejectWithValue(RecoveryErrors.UserNotExists);
      }

      return rejectWithValue(RecoveryErrors.ServerError);
    }
  }
);

export const RecoveryThunks = {
  Recovery,
  RecoveryCheck,
};
