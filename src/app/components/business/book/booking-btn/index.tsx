import { MouseEvent, useEffect, useState } from 'react';
import { Book, BookBtnText, BookListItem, DataTestIds, User } from '@types';
import { BookBooking, Button, ButtonColor } from '@components';
import { getBookedDate } from '@helpers';
import { BookingBtnProps } from './booking-btn-types';

type ButtonStyles = {
  color: ButtonColor;
  disabled: boolean;
};
type BookingBtn = 'available' | 'your-booked' | 'other-booked' | 'handed';

const getBookingBtnType = (book: BookListItem | Book, account: User): BookingBtn => {
  if (book.delivery?.dateHandedTo) return 'handed';

  if (!book.booking) return 'available';

  if (account && account.id === book.booking.customerId) return 'your-booked';

  if (book.booking.customerId) return 'other-booked';

  return 'available';
};

const getBookingBtnText = (type: BookingBtn, book: BookListItem | Book): BookBtnText | string => {
  switch (type) {
    case 'available':
      return BookBtnText.Available;
    case 'other-booked':
      return BookBtnText.OtherBooked;
    case 'handed':
      return BookBtnText.Handed + getBookedDate(book?.delivery?.dateHandedTo);
    case 'your-booked':
      return BookBtnText.YourBooked;
    default:
      return BookBtnText.Available;
  }
};

const getButtonProps = (t: BookingBtn): ButtonStyles => {
  switch (t) {
    case 'available':
      return { color: 'primary', disabled: false };
    case 'your-booked':
      return { color: 'secondary', disabled: false };
    case 'handed':
      return { color: 'secondary', disabled: true };
    case 'other-booked':
      return { color: 'secondary', disabled: true };
    default:
      return { color: 'primary', disabled: false };
  }
};

export const BookingButton = ({ account, book, ...props }: BookingBtnProps) => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const [bookType, setBookType] = useState(() => getBookingBtnType(book, account as User));
  const [text, setText] = useState(() => getBookingBtnText(bookType, book));

  useEffect(() => {
    setBookType(getBookingBtnType(book, account as User));
    setText(getBookingBtnText(bookType, book));
  }, [account, book, bookType]);

  const btnProps = getButtonProps(bookType);

  const onBookingOpen = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    setBookingOpen(true);
  };

  return (
    <>
      <Button
        data-test-id={DataTestIds.BookingButton}
        onClick={onBookingOpen}
        color={btnProps.color}
        disabled={btnProps.disabled}
        {...props}
      >
        {text}
      </Button>
      <BookBooking book={book} open={bookingOpen} setOpen={setBookingOpen} />
    </>
  );
};
