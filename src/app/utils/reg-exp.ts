/* eslint-disable quotes */
/* eslint-disable no-useless-escape */
import { Mask } from 'react-text-mask';

export const PHONE_INPUT_MASK: Mask = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export enum AllRegExp {
  Phone = `^[+]375 [(](25|29|33|44)[)] [0-9]{3}-[0-9]{2}-[0-9]{2}$`,
  LatinAlphabetAndNumbers = '^[a-zA-Z0-9]+$',
  LatinAlphabet = '[a-zA-Z]',
  Numbers = '[0-9]',
  Min8 = '^.{8,}$',
  CapitalLatinLetter = '[А-ЯA-Z]',
  CapitalLatinLetterFlags = 'g',
  MinOneNumberFlags = 'g',
}
