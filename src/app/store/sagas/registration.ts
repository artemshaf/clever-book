/* eslint-disable no-promise-executor-return */
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { api } from '@api';
import { ApiUrls } from '@utils';
import { registrationActions } from '@store';
import { LoginData, RegistartionErrors, RegistrationResponseDto } from '@types';
import { AxiosError, AxiosPromise } from 'axios';

function* registrationReqWorker({ payload }: PayloadAction<LoginData>) {
  try {
    const response: Awaited<AxiosPromise<RegistrationResponseDto>> = yield call(api.post, ApiUrls.Registration, {
      ...payload,
    });

    yield put(registrationActions.setRegistrationSuccess());
  } catch (error) {
    const { response } = error as AxiosError;

    if (!response) {
      yield put(registrationActions.setRegistrationFailure(RegistartionErrors.ServerError));

      return;
    }

    if (response.status === 400) {
      yield put(registrationActions.setRegistrationFailure(RegistartionErrors.UserExists));
    } else {
      yield put(registrationActions.setRegistrationFailure(RegistartionErrors.ServerError));
    }
  }
}

export function* registrationReqWatcher() {
  yield takeLatest(registrationActions.setRegistrationRequest.type, registrationReqWorker);
}
