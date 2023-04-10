import classNames from 'classnames';
import { memo } from 'react';

import { getFullRussianDate, getImgUrl } from '@helpers';
import { Rating, Typography, UserAvatar } from '@components';
import { DataTestIds } from '@types';

import { BookReviewItemProps } from './book-review-types';

import styles from './book-review.module.scss';

export const ReviewItem = memo(({ review }: BookReviewItemProps) => (
  <li data-test-id={DataTestIds.CommentWrapper} className={classNames(styles.review__list__item)}>
    <div className={styles.review__list__item__info}>
      <UserAvatar src={review.user.avatarUrl ? getImgUrl(review.user.avatarUrl) : undefined} size='s' />
      <Typography data-test-id={DataTestIds.CommentAuthor}>
        {review?.user?.firstName} {review?.user?.lastName}
      </Typography>
      <Typography data-test-id={DataTestIds.CommentDate}>
        {getFullRussianDate(review.createdAt || new Date())}
      </Typography>
    </div>
    <Rating rate={review.rating} isChanged={false} className={styles.review__list__item__rate} />
    <Typography data-test-id={DataTestIds.CommentText} className={styles.review__list__item__descr} variant='span'>
      {review.text}
    </Typography>
  </li>
));
