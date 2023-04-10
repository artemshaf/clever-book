import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import { MaskedInputProps } from 'react-text-mask';

export type TextFieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error?: FieldError | boolean;
  assistive?: string | JSX.Element;
  isPassword?: boolean;
  maskedOptions?: MaskedInputProps;
  icon?: JSX.Element;
  isTouched?: boolean;
};
