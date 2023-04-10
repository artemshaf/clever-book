import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ModalActions } from '@components';
import { AccountBook, Book, BookListItem, CommentDto } from '@types';

export type ModalReviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  ModalActions & {
    book: Book | BookListItem | AccountBook;
    initialData?: Partial<CommentDto>;
    commentId?: number;
    isProfile?: number;
  };
