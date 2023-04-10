import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Book } from '@types';

export type BookProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  book: Book;
};
