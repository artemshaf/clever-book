import { Link } from 'react-router-dom';

import { storeActions, useActions } from '@store';
import { Button, Typography } from '@components';
import { PAGES } from '@utils';
import { DataTestIds } from '@types';

import styles from '../recovery-password.module.scss';

export const RecoverySuccessedForm = () => {
  const actions = useActions(storeActions);

  return (
    <div data-test-id={DataTestIds.StatusBlock} className={styles['form-info']}>
      <Typography variant='h3'>Новые данные сохранены</Typography>
      <Typography variant='p'>Зайдите в личный кабинет, используя свои логин и новый пароль</Typography>
      <Button color='primary' onClick={() => actions.setRecoveryStep(1)}>
        <Link to={PAGES.LOGIN}>Вход</Link>
      </Button>
    </div>
  );
};
