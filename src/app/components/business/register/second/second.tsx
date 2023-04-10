import classNames from 'classnames';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { storeActions, useActions } from '@store';
import { Button, HighlihtHint, TextField, Typography } from '@components';

import { formResolver } from './resolver';
import styles from './register-second.module.scss';
import { DataTestIds, SecondFieldsRegistration } from '@types';

export const RegisterSecond = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<SecondFieldsRegistration>({ resolver: formResolver, mode: 'all' });
  const actions = useActions(storeActions);

  const onSubmit: SubmitHandler<SecondFieldsRegistration> = (data) => {
    actions.setSecondRegistrationData(data);
    actions.setRegistrationStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestIds.RegisterForm}>
      <Controller
        control={control}
        name='firstName'
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
          <TextField
            name={name}
            error={error}
            isTouched={isTouched}
            value={value}
            onChange={onChange}
            ref={ref}
            onBlur={onBlur}
            assistive={error && <HighlihtHint errors={error.type} />}
            placeholder='Имя'
          />
        )}
      />
      <Controller
        control={control}
        name='lastName'
        render={({ field: { onChange, ref, onBlur, value, name }, fieldState: { isTouched, error } }) => (
          <TextField
            name={name}
            error={error}
            isTouched={isTouched}
            onChange={onChange}
            value={value}
            ref={ref}
            onBlur={onBlur}
            assistive={error && <HighlihtHint errors={error.type} />}
            placeholder='Фамилия'
          />
        )}
      />
      <Button disabled={!isDirty || !isValid} type='submit' color='primary'>
        Последний шаг
      </Button>
    </form>
  );
};
