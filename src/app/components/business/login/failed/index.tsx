import { selectLoginState, storeActions, useActions, useAppSelector } from '@store';
import { Button, Typography } from '@components';

import styles from '../login.module.scss';

export const RegisterFormFailed = () => {
  const actions = useActions(storeActions);
  const loginState = useAppSelector(selectLoginState);

  return (
    <div className={styles['form-info']} data-test-id='status-block'>
      <Typography variant='h3'>Вход не выполнен</Typography>
      <Typography variant='p'>Что-то пошло не так. Попробуйте ещё раз</Typography>
      <Button
        onClick={() => {
          actions.setLoginRequest(loginState.data);
        }}
        color='primary'
      >
        повторить
      </Button>
    </div>
  );
};
