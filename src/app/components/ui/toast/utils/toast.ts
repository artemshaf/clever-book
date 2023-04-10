import { getKey } from '@helpers';
import { ToastType, ToastProvider, Toast } from '../types';

export type Toaster = ToastProvider & {
  type: ToastType;
};

export const toaster = ({ content, type, config }: Toaster): Toast => {
  return {
    id: getKey(),
    content,
    type,
    config,
  };
};
