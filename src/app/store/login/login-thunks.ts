import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponseDto, RequestError } from '@types';
import { RootState, SlicesName } from '@store';
import { ApiUrls } from '@utils';
import { api } from '@api';
import { AxiosError } from 'axios';

const Login = createAsyncThunk<LoginResponseDto>(
  `${SlicesName.Login}/login`,
  async (_, { getState, rejectWithValue }) => {
    const {
      login: { data, error: loginError },
    } = getState() as RootState;

    try {
      const response = (await api.post(`${ApiUrls.Login}`, { json: data })) as LoginResponseDto;

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        try {
          const errorResponse = error.response?.request;

          console.log(errorResponse);

          return rejectWithValue({ data: errorResponse?.data, error: errorResponse.data } as RequestError);
        } catch (e) {
          return rejectWithValue(null);
        }
      }

      return rejectWithValue(null);
    }
  }
);

export const LoginThunks = {
  Login,
};
