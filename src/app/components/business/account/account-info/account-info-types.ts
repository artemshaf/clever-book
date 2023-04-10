import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ImportantAccountData } from '@store';

export type AccountInfoProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  profile: ImportantAccountData;
};
