import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { LoginData } from '@types';

export const formResolver = joiResolver(
  Joi.object<LoginData>({
    identifier: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  })
);
