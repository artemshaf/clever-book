import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from '@api';
import { ApiUrls, LocalStorageKeys } from '@utils';
import { LoginResponseDto, LoginErrors, LoginData } from '@types';
import { loginActions, accountActions } from '@store';
import { AxiosError, AxiosPromise } from 'axios';

function* loginReqWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const response: Awaited<AxiosPromise<LoginResponseDto>> = yield call(api.post, ApiUrls.Login, { ...payload });

    const { jwt, user } = response.data;

    yield put(loginActions.setLoginSuccess());
    yield put(accountActions.setAccountData(user));
    yield localStorage.setItem(LocalStorageKeys.Account, JSON.stringify(user));
    yield localStorage.setItem(LocalStorageKeys.Token, JSON.stringify(jwt));
  } catch (error) {
    const { response } = error as AxiosError;

    if (!response) {
      yield put(loginActions.setLoginFailure(LoginErrors.ServerError));

      return;
    }

    if (response.status === 400) {
      yield put(loginActions.setLoginFailure(LoginErrors.NotExists));
    } else {
      yield put(loginActions.setLoginFailure(LoginErrors.ServerError));
    }
  }
}

export function* loginReqWatcher() {
  yield takeLatest(loginActions.setLoginRequest.type, loginReqWorker);
}
