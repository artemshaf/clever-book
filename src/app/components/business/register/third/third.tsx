import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button, HighlihtHint, TextField, Typography } from '@components';
import { selectRegistrationState, storeActions, useActions, useAppSelector } from '@store';
import { PHONE_INPUT_MASK } from '@utils';

import classNames from 'classnames';
import styles from './register-third.module.scss';
import { formResolver } from './resolver';
import { DataTestIds, ThirdFieldsRegistration } from '@types';

export const RegisterThird = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ThirdFieldsRegistration>({ resolver: formResolver, mode: 'all' });
  const { data: regData } = useAppSelector(selectRegistrationState);
  const actions = useActions(storeActions);

  const onSubmit: SubmitHandler<ThirdFieldsRegistration> = (data) => {
    actions.setThirdRegistrationData(data);
    actions.setRegistrationRequest({ ...regData, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestIds.RegisterForm}>
      <Controller
        control={control}
        name='phone'
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
          <TextField
            name={name}
            error={error}
            isTouched={isTouched}
            assistive={isTouched ? <HighlihtHint type='phone' errors={error?.type || ''} /> : undefined}
            value={value}
            ref={ref}
            onBlur={onBlur}
            placeholder='Телефон'
            maskedOptions={{
              mask: PHONE_INPUT_MASK,
              placeholderChar: 'x',
              value,
              onBlur,
              onChange,
              keepCharPositions: true,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error, invalid } }) => (
          <TextField
            name={name}
            error={error}
            isTouched={isTouched}
            ref={ref}
            onBlur={onBlur}
            assistive={error && <HighlihtHint type='mail' errors={error?.type || ''} />}
            onChange={onChange}
            value={value}
            placeholder='Почта'
          />
        )}
      />
      <Button disabled={!isValid || !isDirty} className={styles.btn} type='submit' color='primary'>
        Зарегистрироваться
      </Button>
    </form>
  );
};
