import { DetailedHTMLProps, LiHTMLAttributes } from 'react';
import { AccountBook, AccountBooking, AccountDelivery, AccountHistory, BookListItem, VariantDisplay } from '@types';

export type BookItem = {
  book: BookListItem;
  filteredText?: string;
  location?: string;
};

export type BookItemProf = {
  location?: string;
} & (
  | {
      book: AccountBooking;
      type: 'booked';
    }
  | {
      book: AccountDelivery;
      type: 'delivery';
    }
  | {
      book: AccountBook;
      type: 'history';
    }
);
export type BookItemProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
  book: BookListItem;
  variantDisplay: VariantDisplay;
  filteredText: string;
  location: string;
};
