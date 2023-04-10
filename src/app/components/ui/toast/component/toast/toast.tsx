import { FC } from 'react';
import { ToastIcon } from '../icons';
import { Toast as ToastType } from '../../types';
import { DataTestIds } from '@types';
import classNames from 'classnames';
import styles from './toast.module.scss';

export type ToastProps = ToastType & {
  onClose: (id: string) => void;
};

export const Toast: FC<ToastProps> = ({ id, content, type, config: { backgroundColor, color } = {}, onClose }) => {
  return (
    <li
      className={classNames(styles[`${type}`], styles.toast)}
      style={{ backgroundColor }}
      data-test-id={DataTestIds.Alert}
    >
      <div className={styles.icon}>
        <ToastIcon type={type} />
      </div>
      <div className={styles.content}>
        <p style={{ color }}>{content}</p>
      </div>
      <button data-test-id={DataTestIds.AlertClose} className={styles.close} type='button' onClick={() => onClose(id)}>
        <ToastIcon type='close' />
      </button>
    </li>
  );
};
