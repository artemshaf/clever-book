import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { calendarReducer } from './calendar';
import { accountReducer } from './account';
import { booksReducer } from './book';
import { bookReducer } from './book/book-slice';
import { genreReducer } from './genre';
import { loginReducer } from './login';
import { recoveryReducer } from './recovery';
import { registrationReducer } from './registration';
import { searchReducer } from './search';
import { topPanelReducer } from './top-panel';
import { filesReducer } from './file';

import { allSagas } from './sagas';

const reducer = {
  search: searchReducer,
  books: booksReducer,
  book: bookReducer,
  genres: genreReducer,
  topPanel: topPanelReducer,
  registration: registrationReducer,
  login: loginReducer,
  recovery: recoveryReducer,
  account: accountReducer,
  calendar: calendarReducer,
  file: filesReducer,
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development' ? true : false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(allSagas);
