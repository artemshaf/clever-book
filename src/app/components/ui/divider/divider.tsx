import classNames from 'classnames';

import { DividerProps } from './divider-types';
import styles from './divider.module.scss';

export const Divider = ({ className, ...props }: DividerProps) => (
  <div className={classNames(styles.divider, className)} {...props} />
);
