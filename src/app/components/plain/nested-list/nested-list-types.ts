import { DetailedHTMLProps, OlHTMLAttributes } from 'react';

import { INestedList } from '../../../data';

export type NestedListProps = DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> & {
  list: INestedList;
};
