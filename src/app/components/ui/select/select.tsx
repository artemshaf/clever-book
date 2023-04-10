/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Icon } from '../icon';
import { Typography } from '../typography';

import { SelectProps, SelectItem } from './select-types';

import styles from './select.module.scss';

export const Select = ({ startSelected, onChangeAction, data, className, selectDataTestId, ...props }: SelectProps) => {
  const [selected, setSelected] = useState<SelectItem | null>(() => startSelected || data[0]);

  const handleItemClick = (item: SelectItem) => {
    setSelected(item);
    onChangeAction(item);
  };

  useEffect(() => {
    if (!startSelected) return;

    setSelected(startSelected);
  }, [startSelected]);

  return (
    <div className={classNames(styles.select, className)} {...props}>
      <div className={classNames(styles.container, styles.select__wrapper)}>
        <div
          data-test-id={selectDataTestId}
          tabIndex={0}
          className={classNames(styles.item_selected, styles.current__selected)}
        >
          <Typography variant='span'>{selected?.label || ''}</Typography>
          <Icon aria-hidden='true' className={styles['select-icon']} icon='DropDown' />
        </div>
        <ul className={classNames(styles.list, styles.select__list)}>
          {data.map((item) => (
            <li className={styles.list__item} key={`select-option-${item.value}`}>
              <button className={styles.list__item__btn} type='button' onClick={() => handleItemClick(item)}>
                <Typography variant='span' className={styles.label}>
                  {item.label}
                </Typography>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
