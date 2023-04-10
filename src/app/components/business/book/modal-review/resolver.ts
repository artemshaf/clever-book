import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

import { CommentDto, FirstFieldsRegistration, PasswordErrors, UsernameErrors } from '@types';
import { AllRegExp } from '@utils';

export const formResolver = joiResolver(
  Joi.object<CommentDto>({
    book: Joi.number(),
    user: Joi.number(),
    rating: Joi.number().max(5).min(1),
    text: Joi.string().min(0),
  })
);
