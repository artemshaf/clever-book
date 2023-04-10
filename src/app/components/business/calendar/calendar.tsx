import cn from 'classnames';
import { useEffect, useState } from 'react';

import { getKey } from '@helpers';

import { Button, Select } from '@components';
import { DataTestIds } from '@types';

import { getDatesInMonth, getMonthWithYearLabel, getSelectDataForCalendar, weekDayNames } from './helpers';
import { CalendarProps } from './calendar-types';
import { CalendarRow } from './calendar-row';

import styles from './calendar.module.scss';

export const Calendar = ({ selectDay, onSelectDay, selectDate, onSelectDate, className, ...props }: CalendarProps) => {
  const [weeks, setWeeks] = useState(() => renderWeeks(selectDate));

  const handlePrevMonthClick = () => {
    onSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth() - 1));
  };

  const handleNextMonthClick = () => {
    onSelectDate(new Date(selectDate.getFullYear(), selectDate.getMonth() + 1));
  };

  useEffect(() => {
    setWeeks(renderWeeks(selectDate));
  }, [selectDate]);

  function renderWeeks(date: Date) {
    const dates = getDatesInMonth(date);

    const weeks = [];

    for (let i = 0, l = dates.length; i < l; i += 7) {
      const subArr = dates.slice(i, i + 7); // !Get the next 7 elements

      weeks.push(subArr);
    }

    return weeks;
  }

  return (
    <div className={styles.wrapper} data-test-id={DataTestIds.Calendar}>
      <section className={styles.choise__wrapper}>
        <Select
          selectDataTestId={DataTestIds.MonthSelect}
          className={styles.choise__date}
          startSelected={{
            label: getMonthWithYearLabel(selectDate),
            value: selectDate.toDateString(),
          }}
          onChangeAction={(item) => onSelectDate(new Date(item.value))}
          data={getSelectDataForCalendar(selectDate)}
        />
        <div className={styles.choise__btns}>
          <Button
            data-test-id={DataTestIds.MonthBtnNext}
            type='button'
            icon='Up'
            color='secondary'
            onClick={handlePrevMonthClick}
          />
          <Button
            type='button'
            data-test-id={DataTestIds.MonthBtnPrev}
            icon='Down'
            color='secondary'
            onClick={handleNextMonthClick}
          />
        </div>
      </section>
      <table className={cn(styles.calendar, className)} {...props}>
        <thead>
          <tr>
            {weekDayNames.map((name) => (
              <th key={name} className={styles['week-day']}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <CalendarRow
              onSelectDate={onSelectDate}
              selectDate={selectDate}
              onSelectDay={onSelectDay}
              selectDay={selectDay}
              week={week}
              key={getKey()}
            />
          ))}
          {}
        </tbody>
      </table>
    </div>
  );
};
