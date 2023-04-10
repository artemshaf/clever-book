/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useRef } from 'react';
import { useLockedBody, useOnClickOutside } from 'usehooks-ts';

import { Button, Portal } from '@components';

import { ModalProps } from './modal-types';
import styles from './modal.module.scss';
import { DataTestIds } from '@types';

export const Modal = ({ open, setOpen, withClose = false, children, className, ...props }: ModalProps) => {
  const containerRef = useRef(null);

  useLockedBody(open);

  const handleClickOutside = () => {
    setOpen(false);
  };

  const onClickInside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  useOnClickOutside(containerRef, handleClickOutside);

  if (!open) return null;

  return (
    <Portal>
      <div data-test-id={DataTestIds.ModalOuter} onClick={onClickInside} id='modal-wrapper' className='black-bg'>
        <div className={styles.wrapper}>
          <div ref={containerRef} className={classNames(styles.modal, className)} {...props}>
            {withClose && (
              <Button
                data-test-id={DataTestIds.ModalCloseButton}
                onClick={() => setOpen(false)}
                className={styles.close}
                color='secondary'
                icon='Close'
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
