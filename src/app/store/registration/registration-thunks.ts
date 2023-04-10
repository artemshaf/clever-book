import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, SlicesName } from '@store';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { AxiosError } from 'axios';
import { RegistrationResponseDto } from '@types';

const Registration = createAsyncThunk<RegistrationResponseDto>(
  `${SlicesName.Registration}/registration`,
  async (_, { getState, rejectWithValue }) => {
    const {
      registration: { data },
    } = getState() as RootState;

    try {
      const response = (await api.post(`${ApiUrls.Registration}`, { json: data })) as RegistrationResponseDto;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);

        return rejectWithValue(null);
      }

      return rejectWithValue(error);
    }
  }
);

export const RegistrationThunks = {
  Registration,
};
