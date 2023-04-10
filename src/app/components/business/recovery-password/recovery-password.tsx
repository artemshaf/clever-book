import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { DataTestIds, StateStatus } from '@types';
import { Icon, Loader, Portal, Typography } from '@components';
import { PAGES } from '@utils';

import { RecoveryPasswordProps } from './recovery-password-types';
import styles from './recovery-password.module.scss';
import { useRecovery } from './use-recovery';

export const RecoveryPassword = ({ className, ...props }: RecoveryPasswordProps) => {
  const { getCorrectForm, recoveryState } = useRecovery();

  if (recoveryState.status === StateStatus.Pending) {
    return (
      <div id='public-page__wrapper'>
        <Loader />
      </div>
    );
  }

  return (
    <Portal>
      <div id='public-page__wrapper'>
        <div data-test-id={DataTestIds.Auth} className={classNames(styles.recoveryPassword, className)} {...props}>
          <Typography className={styles.logo} variant='h3'>
            Cleverland
          </Typography>
          <div className={styles.wrapper}>
            {recoveryState.step === 1 && (
              <Link to={PAGES.LOGIN}>
                <div className={styles.register__back}>
                  <Icon icon='ArrowLeft' />
                  <Typography variant='span'>вход в личный кабинет</Typography>
                </div>
              </Link>
            )}
            <div className={styles.form__wrapper}>
              {(recoveryState.step === 1 || recoveryState.step === 2) && recoveryState.status === StateStatus.Idle && (
                <Typography variant='h4'>Восстановление пароля</Typography>
              )}
              {getCorrectForm()}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
