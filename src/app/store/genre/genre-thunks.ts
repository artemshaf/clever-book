import { createAsyncThunk } from '@reduxjs/toolkit';

import { Genre, StateStatus } from '@types';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { RootState, SlicesName } from '@store';
import { AxiosResponse } from 'axios';

const getGenreList = createAsyncThunk<Genre[], void>(
  `${SlicesName.Genres}/GENRES`,
  async (_) => {
    const { data }: Awaited<AxiosResponse<Genre[]>> = await api.get(ApiUrls.Categories);

    return data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const { status } = state.genres;

      if (status === StateStatus.Pending || status === StateStatus.Succeeded) {
        return false;
      }

      return true;
    },
  }
);

export const GenresThunks = {
  getGenreList,
};
