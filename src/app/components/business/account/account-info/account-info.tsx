import { Button, HighlihtHint, TextField, Typography } from '@components';
import { Controller } from 'react-hook-form';

import { AccountInfoProps } from './account-info-types';

import styles from './account-info.module.scss';
import { DataTestIds } from '@types';
import { PHONE_INPUT_MASK } from '@utils';
import classNames from 'classnames';
import { useAccountInfo } from './use-account-info';

export const AccountInfo = ({ profile, className, ...props }: AccountInfoProps) => {
  const { form, isEdit, onSubmit, setIsEdit, handleIsEdit } = useAccountInfo({ defaultValues: profile });

  return (
    <section className={styles.account__data} {...props}>
      <div>
        <Typography variant='h3'>Учётные данные</Typography>
        <Typography variant='p'>Здесь вы можете отредактировать информацию о себе</Typography>
      </div>
      <form data-test-id={DataTestIds.ProfileForm} onSubmit={onSubmit} className={styles.account__form}>
        <div className={styles.account__form__fields}>
          <Controller
            control={form.control}
            name='login'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error } }) => (
              <TextField
                name={name}
                error={error}
                isTouched={isTouched}
                ref={ref}
                onBlur={onBlur}
                disabled={!isEdit}
                assistive={
                  error ? (
                    value && value.length > 0 ? (
                      <HighlihtHint type='login' errors={error.type} />
                    ) : (
                      'Поле не может быть пустым'
                    )
                  ) : (
                    'Поле не может быть пустым'
                  )
                }
                onChange={onChange}
                value={value}
                placeholder='Логин'
              />
            )}
          />
          <Controller
            control={form.control}
            name='password'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error } }) => (
              <TextField
                name={name}
                disabled={!isEdit}
                onChange={onChange}
                ref={ref}
                error={error}
                isTouched={isTouched}
                onBlur={onBlur}
                type='password'
                isPassword={true}
                value={value}
                assistive={
                  error ? (
                    value && value.length > 0 ? (
                      <HighlihtHint errors={error?.type || ''} type='password' />
                    ) : (
                      'Поле не может быть пустым'
                    )
                  ) : (
                    'Поле не может быть пустым'
                  )
                }
                placeholder='Пароль'
              />
            )}
          />
          <Controller
            control={form.control}
            name='firstName'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error } }) => (
              <TextField
                name={name}
                error={error}
                isTouched={isTouched}
                ref={ref}
                onBlur={onBlur}
                disabled={!isEdit}
                assistive={error && 'Поле не может быть пустым'}
                onChange={onChange}
                value={value}
                placeholder='Имя'
              />
            )}
          />
          <Controller
            control={form.control}
            name='lastName'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error, invalid } }) => (
              <TextField
                name={name}
                error={error}
                isTouched={isTouched}
                ref={ref}
                onBlur={onBlur}
                disabled={!isEdit}
                assistive={error && 'Поле не может быть пустым'}
                onChange={onChange}
                value={value}
                placeholder='Фамилия'
              />
            )}
          />

          <Controller
            control={form.control}
            name='phone'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error } }) => (
              <TextField
                name={name}
                error={error}
                disabled={!isEdit}
                isTouched={isTouched}
                assistive={error ? <HighlihtHint type='phone' errors={error?.type || ''} /> : undefined}
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
            control={form.control}
            name='email'
            render={({ field: { onChange, value, ref, onBlur, name }, fieldState: { isTouched, error, invalid } }) => (
              <TextField
                name={name}
                error={error}
                disabled={!isEdit}
                isTouched={isTouched}
                ref={ref}
                onBlur={onBlur}
                assistive={error && <HighlihtHint type='mail' errors={error?.type || ''} />}
                onChange={onChange}
                value={value}
                placeholder='Email'
              />
            )}
          />
        </div>
        <div className={styles.account__form__btns}>
          <Button
            className={classNames(styles.btns__edit, {
              [styles.btns__edit_active]: !isEdit,
            })}
            data-test-id={DataTestIds.EditButton}
            onClick={handleIsEdit}
          >
            {isEdit ? 'Редактировать' : 'Редактировать'}
          </Button>
          <Button
            type='submit'
            className={classNames(styles.btns__save, {
              [styles.btns__save_active]: isEdit,
            })}
            data-test-id={DataTestIds.SaveButton}
            disabled={!isEdit}
            color='primary'
          >
            Сохранить изменения
          </Button>
        </div>
      </form>
    </section>
  );
};
