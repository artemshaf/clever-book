import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BookListItem } from '@types';

export type BookListProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  books: BookListItem[] | null;
};
