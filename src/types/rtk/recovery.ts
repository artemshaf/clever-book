export type RecoveryFormSteps = 1 | 'mail' | 2;

export type FirstFieldsRecovery = Pick<RecoderyData, 'email'>;

export type SecondFieldsRecovery = Pick<RecoderyData, 'password' | 'passwordConfirmation' | 'code'>;

export type RecoderyData = {
  email: string;
  passwordConfirmation: string;
  password: string;
  code: string;
};
