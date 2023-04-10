import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { DataTestIds, StateStatus } from '@types';
import { PAGES } from '@utils';
import { Loader, Portal, Icon, Typography } from '@components';

import { RegisterProps } from './register-types';
import styles from './register.module.scss';
import { useRegister } from './use-register';

export const Register = ({ className, ...props }: RegisterProps) => {
  const { getCorrectForm, registerState } = useRegister();

  if (registerState.status === StateStatus.Pending) {
    return (
      <div id='public-page__wrapper' data-test-id={DataTestIds.Auth}>
        <Loader />
      </div>
    );
  }

  return (
    <Portal>
      <div id='public-page__wrapper' data-test-id={DataTestIds.Auth}>
        <Typography className={styles.logo} variant='h3'>
          Cleverland
        </Typography>
        <div className={classNames(styles.register, className)} {...props}>
          {registerState.status === StateStatus.Idle && (
            <div>
              <Typography variant='h4'>Регистрация</Typography>
              <Typography className={styles.step}>{registerState.step} шаг из 3</Typography>
            </div>
          )}
          {getCorrectForm()}
          {registerState.status !== StateStatus.Failed && registerState.status !== StateStatus.Succeeded && (
            <div className={styles.entered__block}>
              <Typography variant='p'>Есть учетная запись?</Typography>
              <Link className={styles.entered__block__link} to={PAGES.LOGIN}>
                <Typography className={styles.entered__text} variant='span'>
                  ВОЙТИ
                </Typography>
                <Icon icon='ArrowRight' />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};
