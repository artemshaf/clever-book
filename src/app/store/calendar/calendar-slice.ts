import { createSlice } from '@reduxjs/toolkit';
import { RootState, SlicesName } from '@store';
import { StateStatus } from '@types';
import { LoadingConstants } from '../../utils';

export type CelendarItem = 'available' | 'other-month' | 'weekend' | 'booked' | 'current' | 'not-allowed';

export type CalendarDataDay = {
  data: Date;
  type: CelendarItem;
};

type CalendarInitialState = {
  status: StateStatus;
  error: string | null;
};

const name = SlicesName.Calendar;

const initialState: CalendarInitialState = {
  status: StateStatus.Idle,
  error: null,
};

export const calendarSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Rejected) && action.type.startsWith(name),
        (state, action) => {
          state.status = StateStatus.Failed;
          state.error = action.payload || action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Fulfilled) && action.type.startsWith(name),
        (state, _) => {
          state.status = StateStatus.Succeeded;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.error = null;
          state.status = StateStatus.Pending;
        }
      ),
});

export const { reducer: calendarReducer, actions: calendarActions } = calendarSlice;

export const selectCalendarState = (state: RootState) => state.calendar;
