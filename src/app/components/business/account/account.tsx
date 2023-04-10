import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserBlock, Typography, Loader, AccountInfo, BookItemProfile, ContentPlug, CropImage } from '@components';
import { getTodayDate } from '@helpers';
import { DataTestIds, StateStatus } from '@types';

import { AccountProps } from './account-types';

import styles from './account.module.scss';
import { useAccount } from './use-account';

export const Account = ({ className, ...props }: AccountProps) => {
  const { accountState, accountInfo, handleFileSelect, swiperSliderProps } = useAccount();

  if (accountState.status === StateStatus.Pending) return <Loader />;

  if (!accountState.profile) return null;

  return (
    <div className={classNames(styles.account, className)} {...props}>
      <UserBlock
        data-test-id={DataTestIds.ProfileAvatar}
        handleFileSelect={handleFileSelect}
        type='account'
        className={styles.avatar}
      />
      <AccountInfo profile={{ ...accountInfo, id: accountState.profile.id }} />
      <section className={styles.booked}>
        <div>
          <Typography className={styles.section__title} variant='h3'>
            Забронированная книга
          </Typography>
          <Typography className={styles.section__subtitle}>
            Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
          </Typography>
        </div>
        {accountState.profile.booking.book ? (
          new Date(accountState.profile.booking.dateOrder).getTime() < getTodayDate(new Date()).getTime() ? (
            <ContentPlug
              type='error'
              data-test-id={DataTestIds.ExpiredCard}
              plugContent={
                <>
                  <Typography className={styles.plug__content} variant='h3'>
                    Дата бронирования книги истекла
                  </Typography>
                  <Typography className={styles.plug__content} variant='subtitle-l'>
                    через 24 часа книга будет доступна всем
                  </Typography>
                </>
              }
            >
              <BookItemProfile type='booked' book={accountState.profile.booking} />
            </ContentPlug>
          ) : (
            <BookItemProfile type='booked' book={accountState.profile.booking} />
          )
        ) : (
          <ContentPlug
            data-test-id={DataTestIds.EmptyBlueCard}
            type='empty'
            plugContent={
              <Typography className={styles.plug__content} variant='h3'>
                Забронируйте книгу и она отобразится{' '}
              </Typography>
            }
          />
        )}
      </section>
      <section className={styles.taked}>
        <div>
          <Typography className={styles.section__title} variant='h3'>
            Книга которую взяли
          </Typography>
          <Typography className={styles.section__subtitle}>
            Здесь можете просмотреть информацию о книге и узнать сроки возврата
          </Typography>
        </div>
        {accountState.profile.delivery.id ? (
          new Date(accountState.profile.delivery.dateHandedTo).getTime() < new Date().getTime() ? (
            <ContentPlug
              data-test-id={DataTestIds.ExpiredCard}
              type='error'
              plugContent={
                <>
                  <Typography className={styles.plug__content} variant='h3'>
                    Вышел срок пользования книги
                  </Typography>
                  <Typography className={styles.plug__content} variant='subtitle-l'>
                    Верните книгу, пожалуйста
                  </Typography>
                </>
              }
            >
              <BookItemProfile type='delivery' book={accountState.profile.delivery} />
            </ContentPlug>
          ) : (
            <BookItemProfile type='delivery' book={accountState.profile.delivery} />
          )
        ) : (
          <ContentPlug
            data-test-id={DataTestIds.EmptyBlueCard}
            type='empty'
            plugContent={
              <Typography className={styles.plug__content} variant='h3'>
                Прочитав книгу, она отобразится в истории
              </Typography>
            }
          />
        )}
      </section>
      <section className={styles.history} data-test-id={DataTestIds.AccountHistory}>
        <div>
          <Typography className={styles.section__title} variant='h3'>
            История
          </Typography>
          <Typography className={styles.section__subtitle}>Список прочитанных книг</Typography>
        </div>
        {accountState.profile.history.books && accountState.profile.history.books.length > 0 ? (
          <Swiper className={styles.swiper} wrapperClass={styles.swiper__wrapper} {...swiperSliderProps}>
            {accountState.profile.history.books.map((b) => (
              <SwiperSlide
                className={styles.swiper__item}
                key={b.id}
                data-test-id={DataTestIds.AccountHistorySlide}
                tag='li'
              >
                <BookItemProfile type='history' book={b} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.plug}>
            <ContentPlug
              data-test-id={DataTestIds.EmptyBlueCard}
              type='empty'
              plugContent={
                <Typography className={styles.plug__content} variant='h3'>
                  Вы не читали книг из нашей библиотеки
                </Typography>
              }
            />
          </div>
        )}
      </section>
    </div>
  );
};
