import { DetailedHTMLProps, TableHTMLAttributes } from 'react';

export type CalendarProps = DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & {
  onSelectDate: (date: Date) => void;
  selectDate: Date;
  selectDay?: Date;
  onSelectDay: (date: Date | undefined) => void;
};
