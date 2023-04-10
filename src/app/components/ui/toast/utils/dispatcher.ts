import { emitter } from './emitter';
import { ToastEvents, Toast, TAction } from '../types';

type IToastDispatcher = {
  dispatch: (value: TAction) => void;
  delay?: number;
};

export const toastDispatcher = ({ dispatch, delay }: IToastDispatcher) => {
  emitter.on(ToastEvents.SHOW, (toast: Toast) => {
    dispatch({ type: 'ADD', toast });

    if (delay)
      setTimeout(() => {
        dispatch({ type: 'REMOVE', id: toast.id });
      }, delay);
  });

  emitter.on(ToastEvents.HIDE, (id: string) => dispatch({ type: 'REMOVE', id }));

  emitter.on(ToastEvents.HIDE_ALL, () => dispatch({ type: 'REMOVE_ALL' }));
};
