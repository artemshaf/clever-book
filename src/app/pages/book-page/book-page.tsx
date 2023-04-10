import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDocumentTitle } from 'usehooks-ts';

import { Loader, Toast, Book, Breadcrumbs, toast } from '@components';
import { getCorrectNameBreadcrumbsByGenre, scrollTop } from '@helpers';
import { selectBookState, storeActions, useActions, useAppSelector, selectGenresState } from '@store';
import { ALL_BOOKS_CATEGORY_NAME, PAGES } from '@utils';

import { IBookPageInterface } from './book-page-interface';
import styles from './book-page.module.scss';
import { DataTestIds } from '../../../types';

type PageParams = {
  id: string;
};

export const BookPage = ({ className, ...props }: IBookPageInterface) => {
  const { id } = useParams<PageParams>();
  const { status, error, book } = useAppSelector(selectBookState);
  const { genres } = useAppSelector(selectGenresState);
  const { pathname } = useLocation();

  useDocumentTitle(book?.title ? `Книга - ${book.title}` : 'Книга');

  const actions = useActions(storeActions);

  const initPage = useCallback(async () => {
    await Promise.all([actions.GetBookById({ id: Number(id) }), actions.getGenreList(), actions.GetAccount()]);
    scrollTop();
  }, [id, actions]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  if (status === 'failed')
    return (
      <div className={styles.bookPage} {...props}>
        <Breadcrumbs
          crumbs={[
            {
              name: 'Все книги',
              path: PAGES.HOME,
              dataTestId: DataTestIds.BreadCrumbsLink,
            },
            {
              name: 'Название книги',
              path: pathname,
              dataTestId: DataTestIds.BookName,
            },
          ]}
        />
        <>{toast.error()}</>
      </div>
    );

  return book ? (
    <div className={styles.bookPage} {...props}>
      <Breadcrumbs
        crumbs={[
          {
            name: genres ? getCorrectNameBreadcrumbsByGenre(genres, pathname.split('/')[2]) : ALL_BOOKS_CATEGORY_NAME,
            path: PAGES.BOOKS_CATEGORIES_FOR_MENU + pathname.split('/')[2],
            dataTestId: DataTestIds.BreadCrumbsLink,
            onClick: () => {
              actions.getBooks();
            },
          },
          {
            name: book?.title || 'Название книги',
            path: pathname,
            dataTestId: DataTestIds.BookName,
          },
        ]}
      />
      <Book book={book} />
    </div>
  ) : (
    <Loader />
  );
};
