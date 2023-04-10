import { Typography } from '@components';
import { DataTestIds } from '@types';

import styles from '../recovery-password.module.scss';

export const RecoveryMailForm = () => {
  return (
    <div data-test-id={DataTestIds.StatusBlock} className={styles['form-info']}>
      <Typography variant='h3'>Письмо выслано</Typography>
      <Typography variant='p'>
        Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
      </Typography>
    </div>
  );
};
