import classNames from 'classnames';

import { getKey } from '@helpers';
import { Typography, BookItem } from '@components';

import { BookListProps } from './book-list-types';

import styles from './book-list.module.scss';
import { useFilteredBooks } from '@hooks';
import { DataTestIds } from '@types';

export const BookList = ({ books, className, ...props }: BookListProps) => {
  const { correctBooks, display, filteredText, location } = useFilteredBooks({ books });

  if (!books) return null;

  if (books.length === 0) {
    return (
      <Typography className={styles['list__not-found']} variant='p'>
        По запросу ничего не найдено
      </Typography>
    );
  }

  return correctBooks && correctBooks.length > 0 ? (
    <ul
      data-test-id={DataTestIds.Content}
      className={classNames(styles.list, styles[`list_${display}`], className)}
      {...props}
    >
      {correctBooks &&
        correctBooks.map((book) => (
          <BookItem
            location={location.pathname}
            filteredText={filteredText}
            key={getKey()}
            variantDisplay={display}
            book={book}
          />
        ))}
    </ul>
  ) : (
    <Typography
      data-test-id={filteredText ? 'search-result-not-found' : 'empty-category'}
      className={styles['not-fount__content']}
      variant='h2'
    >
      {filteredText ? 'По запросу ничего не найдено' : 'В этой категории книг ещё нет'}
    </Typography>
  );
};
