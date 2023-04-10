import { useState } from 'react';
import classNames from 'classnames';

import { Icon } from '@components';

import { RatingProps } from './rating-types';
import styles from './rating.module.scss';
import { DataTestIds } from '@types';
import { getKey } from '@helpers';

export const Rating = ({ onRatingChange, rate = 0, isChanged = true, className, ...props }: RatingProps) => {
  const [rating, setRating] = useState(() => Math.round(rate));
  const [hover, setHover] = useState(0);

  const onClick = (index: number) => {
    if (!isChanged) return;

    setRating(index + 1);

    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const onMouseEnter = (index: number) => {
    if (!isChanged) return;

    setHover(index + 1);
  };

  const onMouseLeave = () => {
    if (!isChanged) return;

    setHover(rating);
  };

  return (
    <ul data-test-id={DataTestIds.StarWrapper} className={classNames(styles.rating, className)} {...props}>
      {[...Array(5)].map((star, index) => (
        <li key={getKey()}>
          <button
            data-test-id={DataTestIds.Star}
            type='button'
            className={classNames(styles.button, {
              [styles.notChanged]: !isChanged,
            })}
            onClick={() => onClick(index)}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
          >
            <Icon
              data-test-id={rating > index ? DataTestIds.StarActive : ''}
              icon={index < (hover || rating) ? 'StarFull' : 'StarEmpty'}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
