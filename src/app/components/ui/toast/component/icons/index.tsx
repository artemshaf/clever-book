import { ToastType } from '../../types';
import { Icon } from '@components';

type ToastIconProps = {
  type: ToastType | 'close';
};

export const ToastIcon = ({ type }: ToastIconProps): JSX.Element => {
  switch (type) {
    case 'error':
      return <Icon icon='WarningCircle' />;
    case 'info':
      return <Icon icon='Info' />;
    case 'warning':
      return <Icon icon='Warning' />;
    case 'close':
      return <Icon icon='Close' />;
    default:
      return <Icon icon='CircleSuccess' />;
  }
};
