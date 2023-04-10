import { Book, BookListItem, CreateBookingStatusText, DeleteBookingStatusText, UpdateBookingStatusText } from '@types';
import { useState } from 'react';
import { selectAccountState, selectCalendarState, storeActions, useActions, useAppSelector } from '../../../../store';
import { ModalActions, toast } from '@components';
import { areEqual, getTimeZoneMinskDate } from '../../calendar/helpers';

type useBookingProps = {
  book: BookListItem | Book;
  modalProps: ModalActions;
};

export const useBooking = ({ book, modalProps: { open, setOpen } }: useBookingProps) => {
  const { data: account } = useAppSelector(selectAccountState);
  const actions = useActions(storeActions);
  const { status } = useAppSelector(selectCalendarState);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(() =>
    book.booking?.dateOrder ? new Date(book.booking?.dateOrder) : undefined
  );

  const isUnBooking = book.booking?.customerId && account?.id && book.booking?.customerId === account?.id;

  const bookingBtnDisabled =
    !selectedDay || (book.booking?.dateOrder && selectedDay && areEqual(new Date(book.booking.dateOrder), selectedDay));

  const createBooking = async () => {
    if (!book?.id || !account?.id || !selectedDay) return;

    const res = actions
      .Booking({
        book: book.id,
        customer: account.id,
        dateOrder: getTimeZoneMinskDate(selectedDay),
        order: true,
      })
      .unwrap();

    res
      .then(async () => {
        await actions.getBooks();
        await actions.GetBookById({ id: book.id });

        toast.success(CreateBookingStatusText.Success);
        setOpen(false);
      })
      .catch(() => {
        toast.error(CreateBookingStatusText.Failed);
        setOpen(false);
      });
    setSelectedDay(undefined);
  };

  const updateBooking = () => {
    if (!book?.id || !account || !selectedDay || !book.booking) return;

    actions
      .UpdateBooking({
        bookingId: book.booking.id,
        dto: {
          book: book.id,
          customer: account.id,
          dateOrder: getTimeZoneMinskDate(selectedDay),
          order: true,
        },
      })
      .unwrap()
      .then(async (booking) => {
        actions.updateBooking({
          account,
          bookId: +book.id,
          booking,
        });
        await actions.getBooks();

        await actions.GetBookById({ id: book.id });

        toast.success(UpdateBookingStatusText.Success);
        setOpen(false);
      })
      .catch((e) => {
        toast.error(UpdateBookingStatusText.Failed);
        setOpen(false);
      });

    setSelectedDay(undefined);
  };

  const deleteBooking = () => {
    if (!book.booking) return;

    actions
      .DeleteBooking(book.booking.id)
      .unwrap()
      .then(async () => {
        actions.deleteBooking({
          bookId: book.id,
        });

        await actions.getBooks();
        await actions.GetBookById({ id: book.id });

        setSelectedDay(undefined);

        toast.success(DeleteBookingStatusText.Success);
        setOpen(false);
      })
      .catch(() => {
        toast.error(DeleteBookingStatusText.Failed);
        setOpen(false);
      });
  };

  const onBookingClick = () => {
    if (isUnBooking) {
      updateBooking();

      return;
    }

    createBooking();
  };

  return {
    onBookingClick,
    deleteBooking,
    createBooking,
    updateBooking,
    isUnBooking,
    bookingBtnDisabled,
    calendarStatus: status,
    selectedDay,
    setSelectedDay,
    selectedDate,
    setSelectedDate,
  };
};
