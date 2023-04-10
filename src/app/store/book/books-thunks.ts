import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookListItem, StateStatus } from '@types';
import { api } from '@api';
import { ApiUrls } from '@utils';
import { RootState, SlicesName } from '@store';
import { AxiosResponse } from 'axios';

const getBooks = createAsyncThunk<BookListItem[], void>(
  `${SlicesName.Books}/BOOKS`,
  async (_) => {
    const { data }: Awaited<AxiosResponse<BookListItem[]>> = await api.get(ApiUrls.Books, {});

    return data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const { status } = state.books;

      if (status === StateStatus.Pending) {
        return false;
      }

      return true;
    },
  }
);

export const BooksThunks = {
  getBooks,
};
