export enum PasswordErrors {
  Default = 'any.required',
  Empty = 'string.empty',
  Len = 'не менее 8 символов',
  Number = 'минимум 1 число',
  Letter = 'минимум 1 заглавная буква',
}

export enum UsernameErrors {
  Default = 'any.required',
  Empty = 'string.empty',
  Alphabet = 'латинский алфавит',
  Number = 'цифра',
  Superflous = 'лишние символы',
}

export enum PhoneErrors {
  Default = 'any.required',
  Empty = 'string.empty',
  IsNotNumber = 'неккоректный формат',
}
