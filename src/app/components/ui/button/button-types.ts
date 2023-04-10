import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { IconName } from '../icon/icon-types';

export type ButtonColor = 'primary' | 'secondary' | 'text';
type ButtonSizeType = 's' | 'm' | 'l';

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  color?: ButtonColor;
  size?: ButtonSizeType;
  icon?: IconName;
};
