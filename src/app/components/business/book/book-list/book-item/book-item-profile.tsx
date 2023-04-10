import classNames from 'classnames';
import { FC, MouseEvent, useState } from 'react';

import { getBookedDate, GetCorrectTextWithFilter, getImgUrl } from '@helpers';
import { Typography, Rating, BookingButton, Button, toast, ModalReview } from '@components';
import { AccountBooking, CommentDto, DataTestIds, DeleteBookingStatusText } from '@types';

import styles from './book-item.module.scss';
import { BookItemProf } from './book-item-types';
import DefaultImg from './images/default.png';
import { Link } from 'react-router-dom';
import { PAGES } from '@utils';
import { selectAccountState, selectBookState, storeActions, useActions, useAppSelector } from '@store';

export const BookItemProfile: FC<BookItemProf> = ({ type, book, location = PAGES.HOME }) => {
  const actions = useActions(storeActions);
  const [modalOpen, setModalOpen] = useState(false);
  const { profile } = useAppSelector(selectAccountState);

  const onHandleBooked = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await actions
      .DeleteBooking((book as AccountBooking).id)
      .unwrap()
      .then(() => toast.success(DeleteBookingStatusText.Success))
      .catch(() => toast.error(DeleteBookingStatusText.Failed));

    await actions.GetAccount();
  };

  const onChangeComment = async (e: MouseEvent<HTMLButtonElement>, bookId: number) => {
    e.preventDefault();

    setModalOpen(true);

    await actions.GetBookById({ id: bookId });
  };

  const renderButton = () => {
    switch (type) {
      case 'booked':
        return (
          <Button data-test-id={DataTestIds.CancelBookingBtn} onClick={onHandleBooked} size='s' className={styles.btn}>
            Отменить бронь
          </Button>
        );
      case 'delivery':
        return (
          <Link className={styles.delivery__date} to={PAGES.ROUTE_BOOK + book.book.id}>
            Возврат {getBookedDate(new Date(book.dateHandedTo))}
          </Link>
        );
      case 'history': {
        const userComment = profile?.comments?.find((c) => c.bookId === book.id);
        const initialData: Partial<CommentDto> = userComment
          ? { rating: userComment.rating, text: userComment.text }
          : { rating: 5 };

        return (
          <>
            <ModalReview
              commentId={userComment?.id}
              initialData={initialData}
              book={book}
              open={modalOpen}
              setOpen={setModalOpen}
            />
            <Button
              data-test-id={DataTestIds.AccountHistoryReviewBtn}
              onClick={(e) => onChangeComment(e, book.id)}
              color={userComment ? 'secondary' : 'primary'}
              size='s'
              className={styles.btn}
            >
              {userComment ? 'Изменить оценку' : 'Оставить отзыв'}
            </Button>
          </>
        );
      }
      default:
        return (
          <Button size='s' className={styles.btn}>
            Отменить бронь
          </Button>
        );
    }
  };

  const renderContent = () => {
    if (!book) return null;

    switch (type) {
      case 'booked':
        return (
          <li data-test-id={DataTestIds.Card} className={classNames(styles.item, styles.item_tile, styles.account)}>
            <Link to={`${location}/${String(book?.book?.id)}`}>
              <img
                className={styles.img}
                src={book?.book?.image ? getImgUrl(book.book?.image) : DefaultImg}
                alt='Book'
              />
              <div className={styles.item_tile__info__wrapper}>
                <div className={styles.item_tile__info__descr}>
                  {GetCorrectTextWithFilter({ title: book?.book?.title, className: styles.name })}
                  <Typography variant='body-s' className={styles.author}>
                    {`${book.book?.authors.join(', ')}, ${book.book.issueYear}`}
                  </Typography>
                </div>
                <div className={styles.item_tile__btn__wrapper}>
                  {book?.book?.rating ? (
                    <Rating isChanged={false} rate={book?.book?.rating || 0} className={styles.rating} />
                  ) : (
                    <Typography className={styles.rating} variant='p'>
                      ещё нет оценок
                    </Typography>
                  )}
                  {renderButton()}
                </div>
              </div>
            </Link>
          </li>
        );
      case 'delivery':
        return (
          <li
            data-test-id={DataTestIds.Card}
            className={classNames(styles.item, styles.delivery, styles.item_tile, styles.account)}
          >
            <Link to={PAGES.ROUTE_BOOK + book.book.id}>
              <img className={styles.img} src={book.book.image ? getImgUrl(book.book.image) : DefaultImg} alt='Book' />
              <div className={styles.item_tile__info__wrapper}>
                <div className={styles.item_tile__info__descr}>
                  {GetCorrectTextWithFilter({ title: book.book.title, className: styles.name })}
                  <Typography variant='body-s' className={classNames(styles.author)}>
                    {`${book.book?.authors.join(', ')}, ${book.book.issueYear}`}
                  </Typography>
                </div>
                <div className={styles.item_tile__btn__wrapper}>
                  {book.book.rating ? (
                    <Rating isChanged={false} rate={book.book.rating || 0} className={styles.rating} />
                  ) : (
                    <Typography className={styles.rating} variant='p'>
                      ещё нет оценок
                    </Typography>
                  )}
                  {renderButton()}
                </div>
              </div>
            </Link>
          </li>
        );
      case 'history':
        return (
          <Link
            to={`${location}/${book.id}`}
            data-test-id={DataTestIds.Card}
            className={classNames(styles.item, styles.item_list)}
          >
            <div className={styles.item_list__info}>
              <img className={styles.img} src={book.image ? getImgUrl(book.image) : DefaultImg} alt='Book' />
              {book.rating ? (
                <Rating isChanged={false} rate={book.rating || 0} className={styles.rating} />
              ) : (
                <Typography className={styles.rating} variant='p'>
                  ещё нет оценок
                </Typography>
              )}
              {GetCorrectTextWithFilter({ title: book.title, className: styles.name })}
              <Typography variant='body-s' className={styles.author}>
                {`${book?.authors.join(', ')}, ${book?.issueYear}`}
              </Typography>
            </div>
            {renderButton()}
          </Link>
        );
      default:
        return null;
    }
  };

  return renderContent();
};
