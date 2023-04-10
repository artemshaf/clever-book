import { SelectItem } from '@components';

export const weekDayNames: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const isEqualsMonths = (d1: Date, d2: Date) => d1.getMonth() === d2.getMonth();

export const isToday = (date: Date) => {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const isAvailableDate = (date: Date): boolean => {
  const today = new Date();
  const todayDay = today.getDay();
  const dateDay = date.getDay();

  if (date.getFullYear() !== today.getFullYear()) return false;

  if (date.getMonth() !== today.getMonth()) return false;

  //! to limit the days to one week
  const differenceBetweenThree = date.getDate() - today.getDate() >= 0 && date.getDate() - today.getDate() <= 3;

  if (!differenceBetweenThree) return false;

  if (todayDay === 5) {
    //! Today is Friday
    return dateDay === 5 || dateDay === 1;
  }

  if (todayDay === 6 || todayDay === 0) {
    return dateDay === 1;
  }

  //! Today is weekday
  return isToday(date) || date.getDate() === today.getDate() + 1;
};

export function areEqual(a?: Date, b?: Date) {
  if (!a || !b) return false;

  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const isWeekend = (date: Date) => {
  return date.getDay() === 6 || date.getDay() === 0;
};

export const isTomorrow = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  );
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDay();
};

export const getDatesInMonth = (throwDate: Date) => {
  const year = throwDate.getFullYear();
  const month = throwDate.getMonth();

  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const lastDayOfWeek = getLastDayOfMonth(year, month);

  const prevMonthDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const nextMonthDays = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;

  const daysInMonth = getDaysInMonth(year, month);

  const dates: Date[] = [];

  //! Add days from previous month
  for (let i = prevMonthDays; i > 0; i--) {
    const date = new Date(year, month, -i + 1);

    dates.push(date);
  }

  //! Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);

    dates.push(date);
  }

  //! Add days from next month
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(year, month + 1, i);

    dates.push(date);
  }

  return dates;
};

export const getMonthWithYearLabel = (date: Date) =>
  date.toLocaleString('ru', { month: 'long', year: 'numeric' }).slice(0, -2);

export const getSelectDataForCalendar = (d: Date): SelectItem[] => {
  const items: SelectItem[] = [];

  const year = d.getFullYear();

  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(year, i);

    items.push({ label: getMonthWithYearLabel(currentDate), value: currentDate.toDateString() });
  }

  return items;
};

export const getTimeZoneMinskDate = (date: Date) => new Date(date.setHours(date.getHours() + 3)).toISOString();
