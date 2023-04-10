import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Book, BookListItem } from '@types';
import { ModalActions } from '@components';

export type BookBookingProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  ModalActions & {
    book: Book | BookListItem;
  };
