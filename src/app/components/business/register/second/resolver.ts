import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { SecondFieldsRegistration } from '@types';

export const formResolver = joiResolver(
  Joi.object<SecondFieldsRegistration>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  })
);
