import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, HighlihtHint, Icon, TextField, Typography } from '@components';
import { storeActions, useActions } from '@store';

import { formResolver } from './resolver';
import styles from './register-first.module.scss';
import { DataTestIds, FirstFieldsRegistration } from '@types';

export const RegisterFirst = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FirstFieldsRegistration>({
    resolver: formResolver,
    shouldFocusError: true,
    mode: 'all',
  });

  const actions = useActions(storeActions);

  const onSubmit: SubmitHandler<FirstFieldsRegistration> = (data) => {
    actions.setFirstRegistrationData(data);
    actions.setRegistrationStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestIds.RegisterForm}>
      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { error } }) => (
          <>
            <TextField
              name={name}
              value={value}
              onChange={onChange}
              ref={ref}
              error={error}
              onBlur={onBlur}
              assistive={<HighlihtHint type='login' errors={error?.type || ''} />}
              placeholder='Придумайте логин для входа'
            />
          </>
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error } }) => (
          <TextField
            name={name}
            onChange={onChange}
            ref={ref}
            error={error}
            isTouched={isTouched}
            onBlur={onBlur}
            type='password'
            isPassword={true}
            value={value}
            icon={
              error ? undefined : (
                <Icon data-test-id={DataTestIds.Checkmark} className={styles['check-icon']} icon='CheckCircle' />
              )
            }
            assistive={<HighlihtHint errors={error?.type || ''} type='password' />}
            placeholder='Пароль'
          />
        )}
      />
      <Button disabled={!isDirty || !isValid} type='submit' color='primary'>
        Следующий шаг
      </Button>
    </form>
  );
};
