import classNames from 'classnames';

import { Button, Calendar, Loader, Modal, Typography } from '@components';

import { BookBookingProps } from './book-booking-types';
import { DataTestIds, StateStatus } from '@types';

import styles from './book-booking.module.scss';
import { useBooking } from './use-booking';

export const BookBooking = ({ book, open = false, setOpen, className, ...props }: BookBookingProps) => {
  const {
    bookingBtnDisabled,
    calendarStatus,
    deleteBooking,
    isUnBooking,
    onBookingClick,
    selectedDate,
    selectedDay,
    setSelectedDate,
    setSelectedDay,
  } = useBooking({ book, modalProps: { open, setOpen } });

  if (!open) {
    return null;
  }

  if (calendarStatus === StateStatus.Pending) return <Loader />;

  return (
    <Modal
      data-test-id={DataTestIds.BookingModalWrapper}
      open={open}
      setOpen={setOpen}
      withClose={true}
      className={classNames(styles.wrapper, className)}
      {...props}
    >
      <Typography data-test-id={DataTestIds.ModalTitle} className={styles.title} variant='h3'>
        {isUnBooking ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
      </Typography>
      <Calendar
        onSelectDay={setSelectedDay}
        selectDay={selectedDay}
        selectDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Button
        data-test-id={DataTestIds.BookingButton}
        onClick={onBookingClick}
        color='primary'
        disabled={bookingBtnDisabled}
        className={styles.btn}
      >
        забронировать
      </Button>
      {isUnBooking && (
        <Button
          onClick={() => deleteBooking()}
          data-test-id={DataTestIds.BookingCancelButton}
          color='secondary'
          className={styles.btn}
        >
          отменить бронь
        </Button>
      )}
    </Modal>
  );
};
