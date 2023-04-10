/* eslint-disable no-restricted-globals */
import { Book, BookInfo } from '@types';
import { ApiUrls } from '@utils';

export * from './pretty-offer-list';
export * from './menu';
export * from './books';

export const getImgUrl = (url: string, prefix: string = ApiUrls.Base) => prefix + url;

export const getKey = (count = 2): string => {
  let result = '';

  for (let index = 0; index < count; index++) {
    result += (Math.random() * 10000).toString(36).substring(7);
  }

  return result;
};

export const getRandomPassword = (length = 6): string => {
  if (length < 6) length = 6;

  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const numbers = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length / 2 - 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  //! GET RANDOM UPEPR LETTER
  result += characters.charAt(Math.floor(Math.random() * 10));
  //! GET RANDOM NUMBER
  result += numbers.charAt(Math.floor(Math.random() * 10));

  while (counter < length - 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};

export const getFullRussianDate = (date = new Date()): string =>
  new Intl.DateTimeFormat('ru', {
    dateStyle: 'long',
  }).format(new Date(date));

export const getBookedDate = (date = new Date()): string =>
  new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date));

export const getCapitalizeText = (str: string): string => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export const generateBookInfo = (book: Book): BookInfo => {
  const { ISBN, categories, cover, format, issueYear, pages, producer, publish, weight } = book;

  const genre = categories?.[0] || 'Все книги';

  return {
    cover,
    format,
    genre,
    ISBN,
    issueYear,
    pages,
    producer,
    publish,
    weight,
  };
};

export const getTodayDate = (date: Date | string) => {
  const now = new Date(date);

  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export function isNumeric(number: number | undefined) {
  if (typeof number !== 'string') return false;

  return !isNaN(number) && !isNaN(parseFloat(number));
}

export const scrollTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });
