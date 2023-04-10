import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type RatingProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  isChanged?: boolean;
  rate?: number;
  onRatingChange?: (...args: any[]) => void;
};
