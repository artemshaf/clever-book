import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, SlicesName } from '@store';

const name = SlicesName.Search;

type InitialState = {
  value: string;
  isFocused: boolean;
};

const initialState: InitialState = {
  value: '',
  isFocused: false,
};

export const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    toggleFocused: (state, action: PayloadAction<boolean>) => {
      state.isFocused = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;

export const searchActions = searchSlice.actions;

export const selectSearchState = (state: RootState) => state.search;
export const selectSearchStateText = (state: RootState) => state.search.value;
