import classNames from 'classnames';
import { Swiper as SwiperComp, SwiperSlide } from 'swiper/react';

import { generateBookInfo, getImgUrl, getKey } from '@helpers';
import { Button, BookReview, Divider, BookInfo, Rating, Typography, ModalReview, BookingButton } from '@components';
import { useBookSwiperSlider, useMatchMedia } from '@hooks';
import { CommentDto, DataTestIds } from '@types';

import styles from './book.module.scss';
import { BookProps } from './book-types';
import AvatarDefault from './images/default.png';
import { useState } from 'react';
import { selectAccountState, useAppSelector } from '@store';

export const Book = ({ book, className, ...props }: BookProps) => {
  const { isL } = useMatchMedia();
  const [reviewOpen, setReviewOpen] = useState(false);
  const { bottomSwiperAttrs, slideTo, swiperActiveIndex, topSwiperAttrs } = useBookSwiperSlider(styles);
  const { data: account } = useAppSelector(selectAccountState);

  const onReviewOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setReviewOpen(true);
  };

  const isCommented = book.comments?.find((c) => c.user.commentUserId === account?.id);
  const initialData: Partial<CommentDto> = isCommented ? { rating: isCommented.rating, text: isCommented.text } : {};

  if (!account) return null;

  return (
    <div className={classNames(styles.book, className)} {...props}>
      <div className={styles.book__topInfo}>
        <div className={styles.book__topInfo__img__list}>
          <SwiperComp
            className={styles.swiper__main}
            data-test-id={DataTestIds.SlideBig}
            {...topSwiperAttrs}
            style={{ height: 'auto' }}
          >
            {Array.isArray(book.images) && book.images.length > 0 ? (
              book.images.map((img) => (
                <SwiperSlide tag='li' key={getKey()}>
                  <img src={getImgUrl(img.url)} alt={book.title} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide tag='li' key={getKey()}>
                <img src={AvatarDefault} alt={book.title} />
              </SwiperSlide>
            )}
          </SwiperComp>
          {!isL && Array.isArray(book.images) && book.images.length > 0 && (
            <SwiperComp {...bottomSwiperAttrs}>
              {book.images.map((img, index) => (
                <SwiperSlide
                  onClick={() => slideTo(index)}
                  data-test-id={DataTestIds.SlideMini}
                  tag='li'
                  key={getKey()}
                >
                  <img
                    className={classNames({
                      [styles.img_active]: index === swiperActiveIndex,
                    })}
                    src={getImgUrl(img.url)}
                    alt='book'
                  />
                </SwiperSlide>
              ))}
            </SwiperComp>
          )}
        </div>
        <div className={styles.book__topInfo__descr}>
          <div>
            <Typography
              data-test-id={DataTestIds.BookTitle}
              variant='h3'
              className={styles.book__topInfo__descr__title}
            >
              {book?.title || 'Название книги'}
            </Typography>
            <Typography variant='h5' className={styles.book__topInfo__descr__author}>
              {book.authors?.join(', ')}
            </Typography>
          </div>
          <BookingButton account={account} className={styles.book__topInfo__descr__btn} book={book} />
        </div>
        <div className={styles.book__topInfo__descr__about__wrapper}>
          <Typography variant='h5'>О книге</Typography>
          <Typography className={styles.book__topInfo__descr__about} variant='p'>
            {book.title}
          </Typography>
          <Typography className={styles.book__topInfo__descr__about} variant='p'>
            {book.description}
          </Typography>
        </div>
      </div>
      <div className={styles.book__rating__wrapper}>
        <Typography className={styles.book__rating__title} variant='h3'>
          Рейтинг
        </Typography>
        <Divider className={styles.divider} />
        <div className={styles.book__rating__rate__wrapper}>
          <Rating isChanged={false} rate={book.rating || 0} />
          <Typography variant='span'>{book.rating || 'Отзывов пока нет!'}</Typography>
        </div>
      </div>
      <BookInfo info={generateBookInfo(book)} />
      <BookReview reviews={book.comments} />
      <Button
        onClick={onReviewOpen}
        data-test-id={DataTestIds.ButtonRateBook}
        size='l'
        className={classNames(
          styles.book__btnMark,
          styles.rate__button,
          isCommented?.id ? styles.rate__button_change : styles.rate__button_rate
        )}
      >
        <Typography className={styles.rate__button__text}>
          {isCommented?.id ? 'изменить оценку' : 'оценить книгу'}
        </Typography>
      </Button>
      <ModalReview
        initialData={initialData}
        commentId={isCommented?.id}
        book={book}
        open={reviewOpen}
        setOpen={setReviewOpen}
      />
    </div>
  );
};
