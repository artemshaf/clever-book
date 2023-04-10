import { fork } from 'redux-saga/effects';
import { loginReqWatcher } from './login';
import { registrationReqWatcher } from './registration';

export function* allSagas() {
  yield fork(loginReqWatcher);
  yield fork(registrationReqWatcher);
}
