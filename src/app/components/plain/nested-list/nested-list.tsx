import { memo } from 'react';
import classNames from 'classnames';

import { getPrettyOfferList } from '@helpers';

import { NestedListProps } from './nested-list-types';
import styles from './nested-list.module.scss';

export const NestedList = memo(({ list, className, ...props }: NestedListProps) => (
  <ol className={classNames(styles.nestedList, className)} {...props}>
    {getPrettyOfferList(list)}
  </ol>
));
