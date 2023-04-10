import { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useDocumentTitle } from 'usehooks-ts';

import { BookList, Loader, toast, TopPanel, WithMenu } from '@components';

import { IHomePageInterface } from './home-page-interface';

import styles from './home-page.module.scss';
import { useActions, selectGenresState, storeActions, useAppSelector, selectBooksState } from '@store';
import { DataTestIds } from '@types';

export const HomePage = ({ className, ...props }: IHomePageInterface) => {
  const actions = useActions(storeActions);
  const { books, status } = useAppSelector(selectBooksState);
  const { status: genreStatus } = useAppSelector(selectGenresState);

  const initPage = useCallback(async () => {
    await Promise.all([actions.getBooks(), actions.getGenreList(), actions.GetAccount()]);
  }, [actions]);

  useEffect(() => {
    initPage();
  }, [initPage]);

  useDocumentTitle('Домашная страница');

  if (status === 'pending' || genreStatus === 'pending') return <Loader />;

  if (status === 'failed' || genreStatus === 'failed') {
    return (
      <section data-test-id={DataTestIds.MainPage}>
        <WithMenu className={classNames(className)} {...props}>
          <>{toast.error()}</>
        </WithMenu>
      </section>
    );
  }

  return (
    <section data-test-id={DataTestIds.MainPage}>
      <WithMenu className={classNames(className)} {...props}>
        <div className={styles.content}>
          <TopPanel />
          {books && <BookList books={books} />}
        </div>
      </WithMenu>
    </section>
  );
};
