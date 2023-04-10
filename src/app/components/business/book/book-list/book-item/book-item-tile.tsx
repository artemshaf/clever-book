import classNames from 'classnames';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { GetCorrectTextWithFilter, getImgUrl } from '@helpers';
import { Typography, Rating, BookingButton } from '@components';
import { DataTestIds, BookListItem } from '@types';

import styles from './book-item.module.scss';
import { BookItem } from './book-item-types';
import DefaultImg from './images/default.png';
import { PAGES } from '@utils';
import { selectAccountState, useAppSelector } from '@store';

export const BookItemTile: FC<BookItem> = memo(({ location = PAGES.HOME, book, filteredText = '' }) => {
  const { data: account } = useAppSelector(selectAccountState);

  if (!account) return null;

  return (
    <li data-test-id={DataTestIds.Card} className={classNames(styles.item, styles.item_tile)}>
      <Link to={`${location}/${book.id}`}>
        <img className={styles.img} src={book.image ? getImgUrl(book.image.url) : DefaultImg} alt='Book' />
        <div className={styles.item_tile__info__wrapper}>
          <div className={styles.item_tile__info__descr}>
            {GetCorrectTextWithFilter({ title: book.title, filteredText, className: styles.name })}
            <Typography variant='body-s' className={styles.author}>
              {book.authors?.join(', ')}
            </Typography>
          </div>
          <div className={styles.item_tile__btn__wrapper}>
            {book.rating ? (
              <Rating isChanged={false} rate={book.rating || 0} className={styles.rating} />
            ) : (
              <Typography className={styles.rating} variant='p'>
                ещё нет оценок
              </Typography>
            )}
            <BookingButton account={account} book={book} size='s' className={styles.btn} />
          </div>
        </div>
      </Link>
    </li>
  );
});
