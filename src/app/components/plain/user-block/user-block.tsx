import classNames from 'classnames';
import { forwardRef } from 'react';

import { getCapitalizeText, getImgUrl } from '@helpers';
import { FileSelector, Icon, Typography, UserAvatar } from '@components';

import { UserBlockProps } from './user-block-types';
import styles from './user-block.module.scss';
import { selectAccountState, useAppSelector } from '@store';

export const UserBlock = forwardRef<HTMLDivElement, UserBlockProps>(
  ({ handleFileSelect, type = 'welcome', className, avatarProps, ...props }, ref) => {
    const { data: account, profile } = useAppSelector(selectAccountState);

    const imgSrc = profile?.avatar ? getImgUrl(profile.avatar) : undefined;

    if (type === 'welcome') {
      return (
        <div ref={ref} className={classNames(styles.wrapper, className)} {...props}>
          <Typography className={styles.name_welcome} variant='span'>
            Привет, {getCapitalizeText(account?.firstName || 'Инкогнито')}!
          </Typography>

          <UserAvatar src={imgSrc} size={avatarProps} className={styles.avatar} />
        </div>
      );
    }

    return (
      <div ref={ref} className={classNames(styles.wrapper, className)} {...props}>
        <div className={styles.name__wrapper}>
          <Typography className={styles.name__account} variant='h3'>
            {account?.firstName}
          </Typography>
          <Typography className={styles.name_account} variant='h3'>
            {account?.lastName}
          </Typography>
        </div>
        <div className={styles.avatar__wrapper}>
          <FileSelector onFileSelect={handleFileSelect ? handleFileSelect : () => {}} accept='image/*'>
            <UserAvatar src={imgSrc} className={styles.avatar} size={avatarProps} />
            <div className={styles.avatar__update}>
              <Icon className={styles.avatar__update__photo} icon='Photo' />
            </div>
          </FileSelector>
        </div>
      </div>
    );
  }
);
