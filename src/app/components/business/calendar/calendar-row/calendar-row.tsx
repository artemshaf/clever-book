import cn from 'classnames';

import { CalendarRowProps } from './calendar-row-types';

import { memo } from 'react';
import { areEqual, isAvailableDate, isEqualsMonths, isWeekend } from '../helpers';

import styles from './calendar-row.module.scss';
import { DataTestIds } from '@types';

export const CalendarRow = memo(
  ({ onSelectDate, selectDate, onSelectDay, selectDay, week, ...props }: CalendarRowProps) => {
    const renderDay = (date: Date) => {
      const currentDate = new Date();
      const isPrevMonth = date.getMonth() < currentDate.getMonth();
      const isNextMonth = date.getMonth() > currentDate.getMonth();
      const isDisabled = isPrevMonth || isNextMonth;
      const isHighlighted = isWeekend(date) && isEqualsMonths(selectDate, date);
      const isAvailable = isAvailableDate(date);
      const isWeekEndType = !isDisabled && isHighlighted;
      const isCurrent = areEqual(new Date(date), currentDate);
      const isBooked = areEqual(new Date(date), new Date(selectDay || 0));
      const isOtherMonth = isDisabled || (!isAvailable && !isBooked);

      const onSetDay = () => {
        if (isOtherMonth) return;

        if (isBooked) {
          onSelectDay(undefined);

          return;
        }
        if (isAvailable && !isWeekEndType) {
          onSelectDay(date);
        }
      };

      return (
        <td className={styles.item}>
          <button
            className={cn(styles.btn, {
              [styles.active]: isBooked,
              [styles.current]: isCurrent,
              [styles.available]: isAvailable,
              [styles.weekend]: isHighlighted,
              [styles['other-month']]: isOtherMonth,
            })}
            onClick={onSetDay}
            data-test-id={DataTestIds.CalendarDay}
            type='button'
          >
            {date.getDate()}
          </button>
        </td>
      );
    };

    const renderDaysInWeek = (w: Date[]) => w.map((day) => renderDay(day));

    return <tr {...props}>{renderDaysInWeek(week)}</tr>;
  }
);
