import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FirstFieldsRecovery,
  RecoderyData,
  RecoveryErrors,
  RecoveryFormSteps,
  SecondFieldsRecovery,
  StateStatus,
} from '@types';
import { LoadingConstants } from '@utils';
import { RootState, SlicesName } from '@store';

const name = SlicesName.Recovery;

interface IRecoveryInitialState {
  status: StateStatus;
  error: RecoveryErrors | null;
  data: RecoderyData;
  step: RecoveryFormSteps;
}

const initialState: IRecoveryInitialState = {
  status: StateStatus.Idle,
  error: null,
  data: {} as RecoderyData,
  step: 1,
};

export const recoverySlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: () => {
      return initialState;
    },
    setRecoveryStep: (state, action: PayloadAction<RecoveryFormSteps>) => {
      state.step = action.payload;
    },
    setFirstRecoveryData: (state, action: PayloadAction<FirstFieldsRecovery>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setSecondRecoveryData: (state, action: PayloadAction<SecondFieldsRecovery>) => {
      state.data = { ...state.data, ...action.payload };
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
          state.error = null;
          state.status = StateStatus.Succeeded;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Pending) && action.type.startsWith(name),
        (state, _) => {
          state.error = null;
          state.status = StateStatus.Pending;
        }
      );
  },
});

export const { reducer: recoveryReducer, actions: recoveryActions } = recoverySlice;

export const selectRecoveryState = (state: RootState) => state.recovery;
