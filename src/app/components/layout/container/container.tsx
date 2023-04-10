import classNames from 'classnames';

import { ContainerProps } from './container-types';
import styles from './container.module.scss';

export const Container = ({ children, className, ...props }: ContainerProps) => (
  <div className={classNames(styles.container, className)} id='container' {...props}>
    {children}
  </div>
);
