import { storeActions, useActions } from '@store';
import { Button, Typography } from '@components';
import { DataTestIds } from '@types';

import styles from '../recovery-password.module.scss';

export const RecoveryFailedForm = () => {
  const actions = useActions(storeActions);

  return (
    <div data-test-id={DataTestIds.StatusBlock} className={styles['form-info']}>
      <Typography variant='h3'>Данные не сохранились</Typography>
      <Typography data-test-id='hint' className='highlight-error-text' variant='span'>
        error
      </Typography>
      <Button
        onClick={() => {
          actions.Recovery();
        }}
        color='primary'
      >
        повторить
      </Button>
    </div>
  );
};
