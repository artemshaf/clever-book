import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { BookInfo } from '@types';

export type BookInfoProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  info: BookInfo;
};
