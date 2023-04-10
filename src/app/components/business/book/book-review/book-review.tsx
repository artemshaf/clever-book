import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getKey } from '@helpers';
import { Button, Divider, Typography } from '@components';
import { DataTestIds } from '@types';

import { BookReviewProps } from './book-review-types';

import styles from './book-review.module.scss';
import { makeActualyReviews } from './helpers';
import { ReviewItem } from './book-review-item';

export const BookReview = ({ reviews, className, ...props }: BookReviewProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [comments, setComments] = useState(() => makeActualyReviews(reviews || []));

  useEffect(() => {
    setComments(makeActualyReviews(reviews || []));
  }, [reviews]);

  return (
    <div className={className} {...props}>
      <div className={styles.review__title__wrapper}>
        <div className={styles.review__title__block}>
          <Typography variant='h3'>Отзывы</Typography>
          <Typography className={styles.review__title__count} variant='span'>
            {reviews?.length || 0}
          </Typography>
        </div>
        {reviews && (
          <Button
            className={styles.review__title__btn}
            data-test-id={DataTestIds.ButtonHideReviews}
            color='secondary'
            icon={isOpen ? 'Up' : 'Down'}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}
      </div>
      {isOpen && comments.length > 0 && (
        <>
          <Divider className={styles.divider} />
          <ul data-test-id={DataTestIds.Reviews} className={styles.review__list}>
            {comments.map((review) => (
              <ReviewItem review={review} key={review.id || getKey()} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
