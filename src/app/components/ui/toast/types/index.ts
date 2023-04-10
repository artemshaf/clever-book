export enum ToastEvents {
  SHOW = 'show',
  HIDE = 'hide',
  HIDE_ALL = 'hideAll',
}
type ToastAdd = { type: 'ADD'; toast: Toast };
type ToastRemove = { type: 'REMOVE'; id: string };
type ToastRemoveAll = { type: 'REMOVE_ALL' };

export type TAction = ToastAdd | ToastRemove | ToastRemoveAll;

export type ToastType = 'default' | 'success' | 'error' | 'info' | 'warning';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type ToastContent = string;

export type ToastConfig = {
  backgroundColor?: string;
  color?: string;
};

export type Toast = {
  id: string;
  content: ToastContent;
  type: ToastType;
  config?: ToastConfig;
};

export type ToastProvider = {
  content: ToastContent;
  config?: ToastConfig;
};
