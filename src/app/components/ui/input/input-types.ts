import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, HTMLInputTypeAttribute } from 'react';

type InputWithSearch = {
  isFocused: boolean;
  setFocus: (type: boolean) => void;
  search?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type InputProps = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputWithSearch & {
    name?: string;
    dataTestId?: string;
  };
