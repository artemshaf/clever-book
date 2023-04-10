import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Book, BookListItem, User } from '@types';
import { ButtonProps } from '@components';

export type BookingBtnProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  ButtonProps & {
    book: BookListItem | Book;
    account: User;
  };
