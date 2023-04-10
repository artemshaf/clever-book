import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button, HighlihtHint, Icon, Loader, Portal, RegisterFormFailed, TextField, Typography } from '@components';
import { PAGES } from '@utils';
import { DataTestIds, LoginErrors, StateStatus } from '@types';

import { LoginProps } from './login-types';
import styles from './login.module.scss';
import { useLogin } from './use-login';

export const Login = ({ className, ...props }: LoginProps) => {
  const { loginState, form, onSubmit, navigate } = useLogin();

  if (loginState.status === StateStatus.Pending) {
    return (
      <div id='public-page__wrapper' data-test-id={DataTestIds.Auth}>
        <Loader />
      </div>
    );
  }

  if (loginState.status === StateStatus.Failed && loginState.error === LoginErrors.ServerError) {
    return (
      <Portal>
        <div id='public-page__wrapper' data-test-id={DataTestIds.Auth}>
          <RegisterFormFailed />
        </div>
      </Portal>
    );
  }

  return (
    <Portal>
      <div id='public-page__wrapper' data-test-id={DataTestIds.Auth}>
        <div className={styles.login}>
          <Typography className={styles.logo} variant='h3'>
            Cleverland
          </Typography>
          <div className={classNames(className, styles.form__block)} {...props}>
            <Typography variant='h4'>Вход в личный кабинет</Typography>
            <form onSubmit={onSubmit} data-test-id={DataTestIds.AuthForm}>
              <Controller
                control={form.control}
                name='identifier'
                render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
                  <TextField
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error || !!loginState.error}
                    isTouched={isTouched}
                    ref={ref}
                    onBlur={onBlur}
                    placeholder='Логин'
                    assistive={error && <HighlihtHint type='login' errors={error.type} />}
                  />
                )}
              />
              <Controller
                control={form.control}
                name='password'
                render={({ field: { onChange, onBlur, ref, value, name }, fieldState: { isTouched, error } }) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    error={error || !!loginState.error}
                    isTouched={isTouched}
                    ref={ref}
                    onBlur={onBlur}
                    type='password'
                    isPassword={true}
                    value={value}
                    placeholder='Пароль'
                    assistive={
                      loginState.status === StateStatus.Failed ? (
                        <Typography
                          className={classNames(styles.assestive, styles.assestive_error)}
                          data-test-id='hint'
                          variant='span'
                        >
                          Неверный логин или пароль!
                        </Typography>
                      ) : (
                        error && <HighlihtHint type='password' errors={error.type} />
                      )
                    }
                  />
                )}
              />
              {form.formState.isSubmitted && (
                <Link className={(styles.forgot__text, styles.forgot__wrapper)} to={PAGES.RECOVERY}>
                  Восстановить?
                </Link>
              )}
              {!loginState.error && (
                <Typography
                  onClick={() => {
                    navigate(PAGES.RECOVERY, { state: DataTestIds.Auth });
                  }}
                  className={classNames(styles.assestive, styles.forgot__text_start)}
                  variant='span'
                >
                  Забыли логин или пароль?
                </Typography>
              )}
              <Button disabled={!form.formState.isValid} type='submit' color='primary'>
                вход
              </Button>
            </form>
            <div className={styles.entered__block}>
              <Typography className={styles.not__account} variant='span'>
                Нет учётной записи?
              </Typography>
              <Link className={styles.entered__block__link} to={PAGES.REGISTER}>
                <Typography className={styles.entered__block__text} variant='span'>
                  Регистрация
                </Typography>
                <Icon icon='ArrowRight' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
