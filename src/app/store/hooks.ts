import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { ActionCreator, ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';

import { store } from './store';
import { booksActions, BooksThunks, bookActions, BookThunks } from './book';
import { genreActions, GenresThunks } from './genre';
import { registrationActions, RegistrationThunks } from './registration';
import { loginActions, LoginThunks } from './login';
import { recoveryActions, RecoveryThunks } from './recovery';
import { accountActions } from './account';
import { searchActions } from './search';
import { topPanelActions } from './top-panel';
import { calendarActions, CalendarThunks } from './calendar';
import { filesActions } from './file';
import { AccountThunks } from './account/account-thunks';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const storeActions = {
  ...searchActions,
  ...booksActions,
  ...bookActions,
  ...genreActions,
  ...topPanelActions,
  ...registrationActions,
  ...loginActions,
  ...recoveryActions,
  ...accountActions,
  ...RecoveryThunks,
  ...GenresThunks,
  ...BooksThunks,
  ...BookThunks,
  ...LoginThunks,
  ...RegistrationThunks,
  ...calendarActions,
  ...CalendarThunks,
  ...filesActions,
  ...AccountThunks,
};

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export const useActions = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map((act) => bindActionCreators(act, dispatch));
    }

    return bindActionCreators(actions as any, dispatch);
  }, [actions, dispatch]);
};
