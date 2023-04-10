import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Genre, TopPanelSortByRate, VariantDisplay } from '@types';
import { RootState, SlicesName } from '@store';

const name = SlicesName.TopPanel;

interface ITopPanelInitialState {
  display: VariantDisplay;
  sortedByRate: TopPanelSortByRate;
  selectedGenre: Omit<Genre, 'id'> | null;
}

const initialState: ITopPanelInitialState = {
  display: 'list',
  sortedByRate: 'asc',
  selectedGenre: null,
};

export const topPanelSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    setVariantDisplay: (state, action: PayloadAction<VariantDisplay>) => {
      state.display = action.payload;
    },
    setSortedByRate: (state, action: PayloadAction<TopPanelSortByRate>) => {
      state.sortedByRate = action.payload;
    },
    setSelectedGenre: (state, action: PayloadAction<Omit<Genre, 'id'> | null>) => {
      state.selectedGenre = action.payload;
    },
  },
});

export const { reducer: topPanelReducer, actions: topPanelActions } = topPanelSlice;

export const selectVariantDisplay = (state: RootState) => state.topPanel.display;
export const selectTopPanelState = (state: RootState) => state.topPanel;
export const selectTopPanelGenre = (state: RootState) => state.topPanel.selectedGenre;
