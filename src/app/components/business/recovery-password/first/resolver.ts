import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { FirstFieldsRecovery } from '@types';

export const formResolver = joiResolver(
  Joi.object<FirstFieldsRecovery>({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  })
);
