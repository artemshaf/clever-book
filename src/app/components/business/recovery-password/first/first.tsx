import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { selectRecoveryState, storeActions, useActions, useAppSelector } from '@store';
import { Button, HighlihtHint, Icon, TextField, Typography } from '@components';
import { PAGES } from '@utils';
import { DataTestIds, FirstFieldsRecovery } from '@types';

import { formResolver } from './resolver';
import styles from './first.module.scss';

export const RecoveryFirst = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty, errors },
  } = useForm<FirstFieldsRecovery>({ resolver: formResolver, mode: 'all' });
  const actions = useActions(storeActions);
  const { error: recoveryError } = useAppSelector(selectRecoveryState);

  const onSubmit: SubmitHandler<FirstFieldsRecovery> = (data) => {
    actions.setFirstRecoveryData(data);

    actions
      .RecoveryCheck()
      .unwrap()
      .then(() => {
        actions.setRecoveryStep('mail');
      })
      .catch(() => {});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-test-id={DataTestIds.SendEmailForm}>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            ref={ref}
            error={error}
            assistive={error && <HighlihtHint type='mail' errors={error?.type || ''} />}
            isTouched={isTouched}
            onBlur={onBlur}
            placeholder='Email'
          />
        )}
      />
      {recoveryError && (
        <Typography data-test-id={DataTestIds.Hint} className='highlight-error-text' variant='span'>
          error
        </Typography>
      )}
      <Typography
        className={classNames(styles.assestive, {
          'styles.assistive__text_error': errors.email?.type ? true : false,
        })}
        variant='span'
      >
        На это email будет отправлено письмо с инструкциями по восстановлению пароля
      </Typography>
      <div className={styles.record}>
        <Button className={styles.btn} disabled={!isValid || !isDirty} type='submit' color='primary'>
          Восстановить
        </Button>
        <Typography className={styles.record__text}>
          Нет учётной записи?
          <Link to={PAGES.REGISTER} className={styles.record__text__link}>
            регистрация <Icon icon='ArrowRight' />
          </Link>
        </Typography>
      </div>
    </form>
  );
};
