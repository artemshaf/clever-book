import { useRef } from 'react';
import classNames from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';

import { useMatchMedia } from '@hooks';
import { Button } from '@components';

import { InputProps } from './input-types';
import styles from './input.module.scss';

export const Input = ({
  value = '',
  dataTestId,
  onChange,
  isFocused = false,
  setFocus,
  type = 'text',
  search,
  className,
  placeholder,
  name,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isM } = useMatchMedia();

  useOnClickOutside(inputRef, () => {
    setFocus(false);
  });

  if (isM) {
    return (
      <>
        <label
          style={{ display: isFocused ? 'flex' : 'none' }}
          className={classNames(styles.wrapper, styles.input_focused)}
        >
          <input
            data-test-id={dataTestId}
            ref={inputRef}
            name={name}
            aria-label={name}
            data-testid={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            className={className}
            {...props}
          />
          {search && (
            <Button
              data-test-id='button-search-close'
              onClick={() => setFocus(false)}
              className={classNames(styles.search, styles.search_l, {
                [styles.icons_fill]: isFocused,
              })}
              icon='Close'
            />
          )}
        </label>
        <Button
          style={{ display: isFocused ? 'none' : 'flex' }}
          data-test-id='button-search-open'
          onClick={() => setFocus(true)}
          className={classNames(styles.search, {
            [styles.icons_fill]: isFocused,
          })}
          color='secondary'
          icon='Search'
        />
      </>
    );
  }

  return (
    <label className={styles.wrapper}>
      {search && (
        <Button
          className={classNames(styles.search, styles.search_l, {
            [styles.search__active]: isFocused,
          })}
          icon='Search'
        />
      )}
      <input
        data-test-id={dataTestId}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        {...props}
      />
    </label>
  );
};
