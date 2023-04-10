import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { Icon, Typography } from '@components';

import { TextFieldProps } from './text-field-types';
import styles from './text-field.module.scss';
import { getKey } from '../../../helpers';

export const TextField = forwardRef<HTMLInputElement | MaskedInput, TextFieldProps>(
  (
    {
      type = 'text',
      onBlur,
      isPassword = false,
      name,
      maskedOptions,
      onChange,
      icon,
      value = '',
      placeholder,
      className,
      error,
      assistive,
      isTouched,
      ...props
    },
    ref
  ) => {
    const [id, setId] = useState(() => getKey());
    const [isVisible, setIsVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const getEyeIcon = () =>
      isVisible ? (
        <Icon
          data-test-id='eye-opened'
          onClick={() => setIsVisible(false)}
          className={styles.icon_eye}
          icon='EyeOpen'
        />
      ) : (
        <Icon
          data-test-id='eye-closed'
          onClick={() => setIsVisible(true)}
          className={styles.icon_eye}
          icon='EyeClose'
        />
      );

    return (
      <label className={styles.label} htmlFor={id}>
        <div
          className={classNames(styles.input__wrapper, {
            [styles.input__wrapper_active]: isFocus,
            [styles.input__wrapper_error]: error,
          })}
        >
          {maskedOptions ? (
            <MaskedInput
              name={name}
              value={value}
              id={id}
              onChange={onChange}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={(e) => {
                setIsFocus(false);
                if (onBlur) {
                  onBlur(e);
                }
              }}
              className={classNames(className, [styles.input])}
              {...maskedOptions}
              {...props}
              ref={ref as React.LegacyRef<MaskedInput>}
            />
          ) : (
            <>
              <input
                id={id}
                onPaste={(e) => (isPassword ? e.preventDefault() : e)}
                ref={ref as React.LegacyRef<HTMLInputElement>}
                className={classNames(className, [styles.input], {
                  [styles.isPassword]: isPassword,
                })}
                type={type === 'password' ? (isVisible ? 'text' : 'password') : 'text'}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => {
                  setIsFocus(true);
                }}
                onBlur={(e) => {
                  setIsFocus(false);
                  if (onBlur) {
                    onBlur(e);
                  }
                }}
                {...props}
              />
              {value && (
                <div className={styles.icons}>
                  {icon}
                  {isPassword && getEyeIcon()}
                </div>
              )}
            </>
          )}
        </div>
        <Typography
          variant='span'
          className={classNames(styles.placeholder, {
            [styles.placeholder_active]: isFocus || value,
          })}
        >
          {placeholder}
        </Typography>
        {typeof assistive === 'string' ? (
          <Typography
            data-test-id='hint'
            className={classNames(styles.assistive, {
              [styles.assistive_error]: error,
            })}
            variant='info-l'
          >
            {assistive}
          </Typography>
        ) : (
          <Typography
            className={classNames({
              'highlight-error-text': !isFocus && error,
            })}
            variant='info-l'
          >
            {assistive}
          </Typography>
        )}
      </label>
    );
  }
);
