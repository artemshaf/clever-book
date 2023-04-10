import { DataTestIds, RegistartionErrors, RegistartionErrorsDescription } from '@types';
import { selectRegistrationState, storeActions, useActions, useAppSelector } from '@store';
import { Button, Typography } from '@components';

import styles from '../register.module.scss';

export const RegisterFailedForm = () => {
  const actions = useActions(storeActions);
  const { data, error } = useAppSelector(selectRegistrationState);

  const onClick = () => {
    if (error === RegistartionErrors.UserExists) {
      actions.setInitialRegistration();
    } else {
      actions.setRegistrationRequest(data);
    }
  };

  return (
    <div className={styles['form-info']} data-test-id={DataTestIds.StatusBlock}>
      <Typography variant='h3'>Данные не сохранились</Typography>
      <Typography variant='p'>
        {error === RegistartionErrors.UserExists
          ? RegistartionErrorsDescription.UserExists
          : RegistartionErrorsDescription.ServerError}
      </Typography>
      <Button onClick={onClick} color='primary'>
        {error === RegistartionErrors.UserExists ? 'Назад к регистрации' : 'Повторить'}
      </Button>
    </div>
  );
};
