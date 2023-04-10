import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateStatus } from '@types';

import { LoadingConstants } from '@utils';
import { RootState, SlicesName } from '@store';

const name = SlicesName.File;

interface IGenreInitialState {
  status: StateStatus;
  error: boolean | null;
  files: File[] | null;
  account: File | null;
}

const initialState: IGenreInitialState = {
  status: StateStatus.Idle,
  error: null,
  files: null,
  account: null,
};

export const filesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    setFile: (state, action: PayloadAction<File | null>) => {
      state.files = action.payload ? [action.payload] : null;
    },
    setFiles: (state, action: PayloadAction<File[] | null>) => {
      state.files = action.payload ? action.payload : null;
    },
    setAccountFile: (state, action: PayloadAction<File | null>) => {
      state.account = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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

export const { reducer: filesReducer, actions: filesActions } = filesSlice;

export const selectFileState = (state: RootState) => state.file;
