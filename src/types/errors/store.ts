export enum LoginErrors {
  NotExists = 'USER NOT EXISTS',
  ServerError = 'SERVER ERROR',
}

export enum RegistartionErrors {
  UserExists = 'USER WITH SUCH DATA ALREADY EXISTS',
  ServerError = 'SERVER ERROR',
}

export enum RegistartionErrorsDescription {
  UserExists = 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
  ServerError = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
}

export enum RecoveryErrors {
  UserNotExists = 'USER WITH SUCH DATA NOT EXISTS',
  ServerError = 'SERVER ERROR',
}

export enum RecoveryErrorsDescription {
  UserNotExists = 'USER WITH SUCH DATA NOT EXISTS',
  ServerError = 'Что-то пошло не так!',
}
