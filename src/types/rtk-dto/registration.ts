import { User, Token } from '@types';

export type RegistrationResponseDto = {
  jwt: Token;
  user: User;
};
