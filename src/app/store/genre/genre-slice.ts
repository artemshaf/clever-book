import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, RequestError, StateStatus } from '@types';

import { LoadingConstants } from '@utils';
import { GenresThunks, RootState, SlicesName } from '@store';

const name = SlicesName.Genres;

interface IGenreInitialState {
  status: StateStatus;
  error: RequestError | null;
  genres: Genre[] | null;
}

const initialState: IGenreInitialState = {
  status: StateStatus.Idle,
  error: null,
  genres: null,
};

export const genreSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GenresThunks.getGenreList.pending, (state) => {
        state.error = null;
      })
      .addCase(GenresThunks.getGenreList.fulfilled, (state, action: PayloadAction<Genre[]>) => {
        state.error = null;
        state.genres = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Rejected) && action.type.startsWith(name),
        (state, action) => {
          state.status = StateStatus.Failed;
          state.error = action.payload || null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Fulfilled) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Succeeded;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Pending;
        }
      );
  },
});

export const { reducer: genreReducer, actions: genreActions } = genreSlice;

export const selectGenresState = (state: RootState) => state.genres;
export const selectCorrectGenreByPath = (state: RootState, genrePath: string) =>
  state.genres.genres?.find((genre) => genre.path === genrePath) || '';
