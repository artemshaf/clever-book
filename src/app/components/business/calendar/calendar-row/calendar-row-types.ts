import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type CalendarRowProps = DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> & {
  week: Date[];
  selectDay?: Date;
  onSelectDay: (d: Date | undefined) => void;
  onSelectDate: (date: Date) => void;
  selectDate: Date;
};
