import classNames from 'classnames';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { storeActions, useActions } from '@store';
import { Button, HighlihtHint, Icon, TextField, Typography } from '@components';
import { DataTestIds } from '@types';

import { FormDataWithoutCode, formResolver } from './resolver';
import styles from './second.module.scss';

export const RecoverySecond: FC<{ code: string }> = ({ code }) => {
  const {
    handleSubmit,
    control,
    getFieldState,
    getValues,
    formState: { errors },
  } = useForm<FormDataWithoutCode>({
    resolver: formResolver,
    shouldFocusError: true,
    mode: 'all',
  });
  const actions = useActions(storeActions);

  const onSubmit: SubmitHandler<FormDataWithoutCode> = (data) => {
    actions.setSecondRecoveryData({ ...data, code });

    actions.Recovery();
  };

  const submitDisabled =
    (!!getValues('passwordConfirmation') && getValues('passwordConfirmation').length < 8) ||
    (!!getFieldState('password').error && !!errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestIds.ResetPasswordForm}>
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
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
            assistive={<HighlihtHint type='password' errors={error?.type || ''} />}
            placeholder='Новый пароль'
          />
        )}
      />
      <Controller
        control={control}
        name='passwordConfirmation'
        shouldUnregister={true}
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
          <TextField
            ref={ref}
            name={name}
            isPassword={true}
            onChange={onChange}
            onBlur={onBlur}
            isTouched={isTouched}
            type='password'
            assistive={
              error && (
                <Typography
                  className={classNames(styles.assestive, 'highlight-error-text')}
                  data-test-id={DataTestIds.Hint}
                  variant='span'
                >
                  {value ? value.length < 8 && 'Пароли не совпадают' : 'Поле не может быть пустым'}
                </Typography>
              )
            }
            value={value}
            placeholder='Повторите пароль'
          />
        )}
      />
      <div>
        <Button className={styles.btn} disabled={submitDisabled} type='submit' color='primary'>
          сохранить изменения
        </Button>
        <Typography className={styles.info} variant='p'>
          После сохранения войдите в библиотеку, используя новый пароль
        </Typography>
      </div>
    </form>
  );
};
