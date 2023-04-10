import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Comment } from '../../../../../types';

export type BookReviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  reviews: Comment[] | null;
};

export type BookReviewItemProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  review: Comment;
};
