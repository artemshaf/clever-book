/* eslint-disable consistent-return */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, StateStatus, AccountResponseDto, AccountInfoDto } from '@types';
import { RootState, SlicesName } from '@store';
import { LoadingConstants, LocalStorageKeys } from '@utils';
import { getRandomPassword } from '@helpers';
import { AccountThunks } from './account-thunks';

const name = SlicesName.Account;

export interface IAccountInitial {
  status: StateStatus;
  error: string | null;
  data: User | null;
  profile: AccountResponseDto | null;
}

const initialState: IAccountInitial = {
  data: null,
  error: null,
  status: StateStatus.Idle,
  profile: null,
};

export const accountSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccountInitial: (state) => {
      state = initialState;
    },
    setAccountData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      localStorage.setItem(LocalStorageKeys.Account, JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(AccountThunks.GetAccount.fulfilled, (state, action: PayloadAction<AccountResponseDto>) => {
        state.profile = action.payload;
      })
      .addCase(AccountThunks.UpdateAccountAvatar.fulfilled, (state, action: PayloadAction<AccountResponseDto>) => {
        state.profile = action.payload;
      })
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

export const { reducer: accountReducer, actions: accountActions } = accountSlice;

export const selectAccountState = (state: RootState) => state.account;

export type ImportantAccountData = Omit<AccountInfoDto, 'username'> & { id?: number; login?: string };

export const selectAccountImportantData = (state: RootState) => {
  const { profile, data: accountData } = state.account;

  const data: ImportantAccountData = {
    id: profile?.id || accountData?.id,
    email: profile?.email,
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    password: getRandomPassword(14),
    phone: profile?.phone,
    login: profile?.username,
  };

  return data;
};
