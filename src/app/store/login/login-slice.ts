import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginData, LoginErrors, StateStatus } from '@types';
import { LoadingConstants } from '@utils';
import { RootState, SlicesName } from '@store';

const name = SlicesName.Login;

interface ILoginInitialState {
  status: StateStatus;
  error: LoginErrors | null;
  errorStatus: number | null;
  data: LoginData;
}

const initialState: ILoginInitialState = {
  status: StateStatus.Idle,
  error: null,
  errorStatus: null,
  data: {} as LoginData,
};

export const loginSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInitial: (state) => {
      state = initialState;
    },
    setLoginRequest: (state, action: PayloadAction<LoginData>) => {
      state.data = action.payload;
      state.error = null;
      state.status = StateStatus.Pending;
    },
    setLoginSuccess: (state) => {
      state.status = StateStatus.Succeeded;
    },
    setLoginFailure: (state, action: PayloadAction<LoginErrors>) => {
      state.status = StateStatus.Failed;
      state.error = action.payload;
    },
    setLoginFailureStatus: (state, action: PayloadAction<number>) => {
      state.status = StateStatus.Failed;
      state.errorStatus = action.payload;
    },
    setLoginData: (state, action: PayloadAction<LoginData>) => {
      state.data = action.payload;
    },
    setLoginError: (state, action: PayloadAction<LoginErrors | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith(LoadingConstants.Rejected) && action.type.startsWith(name),
        (state, action) => {
          state.status = StateStatus.Failed;
          state.error = action.payload;
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

export const { reducer: loginReducer, actions: loginActions } = loginSlice;

export const selectLoginState = (state: RootState) => state.login;
