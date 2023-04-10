import classNames from 'classnames';

import { MenuList } from '@components';
import { useMatchMedia } from '@hooks';

import { WithMenuProps } from './with-menu-types';
import styles from './with-menu.module.scss';

export const WithMenu = ({ children, className, ...props }: WithMenuProps) => {
  const { isL } = useMatchMedia();

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      {!isL && <MenuList className={styles.menu} />}
      {children}
    </div>
  );
};
