import classNames from 'classnames';
import { useRef } from 'react';

import { FileSelectorProps } from './file-selector-types';

import styles from './file-selector.module.scss';

export const FileSelector = ({
  onFileSelect,
  accept = 'image/*',
  className,
  children,
  ...props
}: FileSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <button type='button' onClick={handleClick} className={classNames(styles.wrapper, className)} {...props}>
      <input className={styles.input} ref={inputRef} type='file' accept={accept} onChange={handleChange} />
      {children}
    </button>
  );
};
