import classNames from 'classnames';
import { Divider, Typography } from '@components';

import { BookInfoProps } from './book-info-types';

import styles from './book-info.module.scss';
import { getKey } from '@helpers';

export const BookInfo = ({ info, className, ...props }: BookInfoProps) => {
  return (
    <div className={styles.info__wrapper} {...props}>
      <Typography className={styles.info__title} variant='h3'>
        Подробная информация
      </Typography>
      <Divider className={styles.divider} />
      <ul className={styles.info__list}>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Издательство</Typography>
          <Typography variant='span'>{info?.publish}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Год издания</Typography>
          <Typography variant='span'>{info?.issueYear}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Страниц</Typography>
          <Typography variant='span'>{info?.pages}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Обложка</Typography>
          <Typography variant='span'>{info?.cover}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Формат</Typography>
          <Typography variant='span'>{info?.format}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Жанр</Typography>
          <Typography variant='span'>{info?.genre}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Вес</Typography>
          <Typography variant='span'>{info?.weight}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>ISBN</Typography>
          <Typography variant='span'>{info?.ISBN}</Typography>
        </li>
        <li className={styles.info__list__item} key={getKey()}>
          <Typography variant='span'>Изготовитель</Typography>
          <Typography variant='span'>{info?.producer}</Typography>
        </li>
      </ul>
    </div>
  );
};
