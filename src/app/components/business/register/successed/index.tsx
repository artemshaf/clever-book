import { Link, useNavigate } from 'react-router-dom';

import { Button, Typography } from '@components';
import { DataTestIds } from '@types';
import { PAGES } from '@utils';

import styles from '../register.module.scss';

export const RegisterSuccessedForm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles['form-info']} data-test-id={DataTestIds.StatusBlock}>
      <Typography variant='h3'>Регистрация успешна</Typography>
      <Typography variant='p'>
        Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
      </Typography>
      <Button color='primary'>
        <Link to={PAGES.LOGIN}>Вход</Link>
      </Button>
    </div>
  );
};
