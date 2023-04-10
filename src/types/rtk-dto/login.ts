import { User, Token } from '@types';

export type LoginResponseDto = {
  jwt: Token;
  user: User;
};
