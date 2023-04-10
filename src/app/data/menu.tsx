import { DataTestIds } from '@types';
import { ALL_BOOKS_CATEGORY_NAME, PAGES } from '@utils';

export type INestedMenuItem = {
  name: string;
  path: string;
  dataTestId?: string;
  dataTestIdCount?: string;
  items?: INestedMenuItem[];
  itemsCount?: number;
};

export const menuItems: INestedMenuItem[] = [
  {
    name: 'Витрина книг',
    path: `${PAGES.HOME}`,
    dataTestId: `${DataTestIds.Navigation}-showcase`,
    items: [
      {
        name: ALL_BOOKS_CATEGORY_NAME,
        path: 'all',
        dataTestId: `${DataTestIds.Navigation}-books`,
      },
    ],
  },
  {
    name: 'Правила пользования',
    path: PAGES.RIGHT_USE,
    dataTestId: `${DataTestIds.Navigation}-terms`,
  },
  {
    name: 'Договор оферты',
    path: PAGES.OFFER,
    dataTestId: `${DataTestIds.Navigation}-contract`,
  },
];

export const menuItemsPhone: INestedMenuItem[] = [
  {
    name: 'Витрина книг',
    path: PAGES.HOME,
    dataTestId: `${DataTestIds.Burger}-showcase`,
    items: [
      {
        name: ALL_BOOKS_CATEGORY_NAME,
        path: 'all',
        dataTestId: `${DataTestIds.Burger}-books`,
      },
    ],
  },
  {
    name: 'Правила пользования',
    path: PAGES.RIGHT_USE,
    dataTestId: `${DataTestIds.Burger}-terms`,
  },
  {
    name: 'Договор оферты',
    path: PAGES.OFFER,
    dataTestId: `${DataTestIds.Burger}-contract`,
  },
];
