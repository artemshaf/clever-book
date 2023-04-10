import classNames from 'classnames';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { GetCorrectTextWithFilter, getImgUrl } from '@helpers';
import { Typography, Rating, BookingButton } from '@components';
import { DataTestIds } from '@types';

import styles from './book-item.module.scss';
import { BookItem } from './book-item-types';
import DefaultImg from './images/default.png';
import { selectAccountState, useAppSelector } from '@store';

export const BookItemList: FC<BookItem> = memo(({ book, filteredText = '', location = '/books/all' }) => {
  const { data: account } = useAppSelector(selectAccountState);

  if (!account) return null;

  return (
    <li data-test-id={DataTestIds.Card} className={classNames(styles.item, styles.item_list)}>
      <Link to={`${location}/${book.id}`}>
        <div className={styles.item_list__info}>
          <img className={styles.img} src={book.image ? getImgUrl(book.image.url) : DefaultImg} alt='Book' />
          {book.rating ? (
            <Rating isChanged={false} rate={book.rating || 0} className={styles.rating} />
          ) : (
            <Typography className={styles.rating} variant='p'>
              ещё нет оценок
            </Typography>
          )}

          {GetCorrectTextWithFilter({ title: book.title, filteredText, className: styles.name })}
          <Typography variant='body-s' className={styles.author}>
            {book.authors?.join(', ')}
          </Typography>
        </div>
        <BookingButton account={account} book={book} size='s' className={styles.btn} />
      </Link>
    </li>
  );
});
