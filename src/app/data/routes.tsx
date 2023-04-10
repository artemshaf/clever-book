import { AccountPage, BookPage, HomePage, LoginPage, OfferPage, RegisterPage, RightUsePage } from '../pages';
import { RecoveryPage } from '../pages/recovery-page/recovery-page';
import { PAGES } from '../utils';

interface IRoute {
  path: string;
  element: JSX.Element;
}

export const publicRoutes: IRoute[] = [
  {
    path: PAGES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PAGES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: PAGES.RECOVERY,
    element: <RecoveryPage />,
  },
];

export const authRoutes: IRoute[] = [
  {
    path: PAGES.OFFER,
    element: <OfferPage />,
  },
  {
    path: PAGES.BOOK,
    element: <BookPage />,
  },
  {
    path: PAGES.BOOKS_CATEGORIES,
    element: <HomePage />,
  },
  {
    path: PAGES.RIGHT_USE,
    element: <RightUsePage />,
  },
  {
    path: PAGES.ACCOUNT,
    element: <AccountPage />,
  },
];
