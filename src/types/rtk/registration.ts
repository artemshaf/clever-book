export type RegistrationFormSteps = 1 | 2 | 3;

export interface FirstFieldsRegistration extends Pick<RegistrationData, 'username' | 'password'> {}

export interface SecondFieldsRegistration extends Pick<RegistrationData, 'firstName' | 'lastName'> {}

export interface ThirdFieldsRegistration extends Pick<RegistrationData, 'phone' | 'email'> {}

export type RegistrationData = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
