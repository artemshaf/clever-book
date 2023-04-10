import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { PhoneErrors, ThirdFieldsRegistration } from '@types';
import { AllRegExp } from '@utils';

export const formResolver = joiResolver(
  Joi.object<ThirdFieldsRegistration>({
    phone: Joi.string()
      .custom((value, helper) => {
        const regExpForPhone = new RegExp(AllRegExp.Phone);

        let isError = false;
        const errors = [];

        if (value.length === 0 || !value) {
          errors.push(PhoneErrors.Empty);

          return helper.error(errors.join(','));
        }

        if (!regExpForPhone.test(value)) {
          isError = true;

          errors.push(PhoneErrors.IsNotNumber);
        }

        if (isError) {
          return helper.error(errors.join(','));
        }

        return value;
      })
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  })
);
