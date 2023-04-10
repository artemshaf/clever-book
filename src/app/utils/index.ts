export * from './page-constants';
export * from './api-constants';
export * from './reg-exp';

export const ALL_BOOKS_CATEGORY_NAME = 'Все книги';

export enum LoadingConstants {
  Rejected = '/rejected',
  Fulfilled = '/fulfilled',
  Pending = '/pending',
}

export enum LocalStorageKeys {
  Token = 'ACCESS_TOKEN',
  Account = 'ACCOUNT',
}

export enum CookiesKeys {
  Account = 'ACCOUNT',
}
