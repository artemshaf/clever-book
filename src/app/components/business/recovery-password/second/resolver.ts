/* eslint-disable no-template-curly-in-string */
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { PasswordErrors, SecondFieldsRecovery } from '@types';

export type FormDataWithoutCode = Omit<SecondFieldsRecovery, 'code'>;

export const formResolver = joiResolver(
  Joi.object<FormDataWithoutCode>({
    password: Joi.custom((value, helper) => {
      const regExpForMinOneNumber = new RegExp(/\d/, 'g');
      const regExpForCapitalLatinLetter = new RegExp(/[А-ЯA-Z]/, 'g');
      const regExpForMin8 = /^.{8,}$/;

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
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().label('Подтвердите пароль').messages({
      'any.only': '${{#label}} does not match',
    }),
  })
);
