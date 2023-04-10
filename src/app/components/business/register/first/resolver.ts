import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { FirstFieldsRegistration, PasswordErrors, UsernameErrors } from '@types';
import { AllRegExp } from '@utils';

export const formResolver = joiResolver(
  Joi.object<FirstFieldsRegistration>({
    username: Joi.custom((value, helper) => {
      const regExpForLatinAlphabetAndNumbers = new RegExp(AllRegExp.LatinAlphabetAndNumbers);
      const regExpForLatinAlphabet = new RegExp(AllRegExp.LatinAlphabet);
      const regExpForNumber = new RegExp(AllRegExp.Numbers, 'g');

      let isError = false;
      const errors = [];

      if (value.length === 0 || !value) {
        errors.push(UsernameErrors.Empty);

        return helper.error(errors.join(','));
      }

      if (!regExpForLatinAlphabet.test(value)) {
        isError = true;

        errors.push(UsernameErrors.Alphabet);
      }

      if (!regExpForNumber.test(value)) {
        isError = true;

        errors.push(UsernameErrors.Number);
      }

      if (!regExpForLatinAlphabetAndNumbers.test(value)) {
        isError = true;

        errors.push(UsernameErrors.Superflous);
      }

      if (isError) {
        return helper.error(errors.join(','));
      }

      return value;
    }).required(),
    password: Joi.custom((value, helper) => {
      const regExpForMinOneNumber = new RegExp(AllRegExp.Numbers, AllRegExp.MinOneNumberFlags);
      const regExpForCapitalLatinLetter = new RegExp(AllRegExp.CapitalLatinLetter, AllRegExp.CapitalLatinLetterFlags);
      const regExpForMin8 = new RegExp(AllRegExp.Min8);

      let isError = false;
      const errors = [];

      if (value.length === 0 || !value) {
        errors.push(PasswordErrors.Empty);

        return helper.error(errors.join(','));
      }

      if (!regExpForCapitalLatinLetter.test(value)) {
        isError = true;
        errors.push(PasswordErrors.Letter);
      }

      if (!regExpForMinOneNumber.test(value)) {
        isError = true;
        errors.push(PasswordErrors.Number);
      }

      if (!regExpForMin8.test(value)) {
        isError = true;

        errors.push(PasswordErrors.Len);
      }

      if (isError) {
        return helper.error(errors.join(','));
      }

      return value;
    }).required(),
  })
);
