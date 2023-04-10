import classNames from 'classnames';

import UserAvatarImg from './images/avatar.png';
import { UserAvatarProps } from './user-avatar-types';
import styles from './user-avatar.module.scss';

export const UserAvatar = ({ src = UserAvatarImg, alt, size = 'm', className, ...props }: UserAvatarProps) => (
  <img
    className={classNames(styles[`${size}`], styles.img, className)}
    src={src || UserAvatarImg}
    alt={alt}
    {...props}
  />
);
