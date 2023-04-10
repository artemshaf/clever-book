import classNames from 'classnames';
import { FC, useCallback, useEffect } from 'react';
import { Toast } from './component/toast/toast';
import { useToast } from './hooks';
import { emitter, toastDispatcher } from './utils';
import { ToastEvents, ToastPosition } from './types';
import styles from './toast-container.module.scss';

type ToastContainerProps = {
  position?: ToastPosition;
  delay?: number;
};

export const ToastContainer: FC<ToastContainerProps> = ({ position = 'top-center', delay = 4000 }) => {
  const { toasts, dispatch } = useToast();

  useEffect(() => {
    toastDispatcher({ dispatch, delay });

    return () => {
      emitter.off();
    };
  }, [dispatch, delay]);

  const onClose = useCallback((id: string) => {
    emitter.emit(ToastEvents.HIDE, id);
  }, []);

  return (
    <ul className={classNames(styles.wrapper, styles[`${position}`])}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </ul>
  );
};
