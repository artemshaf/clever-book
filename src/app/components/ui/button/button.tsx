/* eslint-disable react/button-has-type */
import classNames from 'classnames';

import { Icon } from '@components';

import { ButtonProps } from './button-types';
import styles from './button.module.scss';

export const Button = ({
  children,
  color = 'primary',
  type = 'button',
  size,
  icon,
  className,
  ...props
}: ButtonProps) => {
  if (!children && icon) {
    return (
      <button
        className={classNames(
          styles[color],
          styles.icon,
          {
            [styles.size]: size,
          },
          className
        )}
        type={type}
        {...props}
      >
        <Icon icon={icon} />
      </button>
    );
  }

  return (
    <button
      className={classNames(
        styles[color],
        styles.button,
        {
          [styles.size]: size,
        },
        className
      )}
      type={type}
      {...props}
    >
      {children}
      {icon && <Icon icon={icon} />}
    </button>
  );
};
