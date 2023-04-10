import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useMatchMedia } from '@hooks';
import { selectSearchState, selectTopPanelState, storeActions, useActions, useAppSelector } from '@store';
import { Button, Icon, Input, Typography } from '@components';
import { DataTestIds } from '@types';

import { TopPanelProps } from './top-panel-types';
import styles from './top-panel.module.scss';

export const TopPanel = ({ className, ...props }: TopPanelProps) => {
  const { isM } = useMatchMedia();
  const actions = useActions(storeActions);
  const { display, sortedByRate } = useAppSelector(selectTopPanelState);
  const search = useAppSelector(selectSearchState);
  const [inputFocused, setInputFocused] = useState(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    actions.setText(value);
  };

  const onChangeSorted = () => {
    if (sortedByRate === null) {
      actions.setSortedByRate('asc');

      return;
    }

    if (sortedByRate === 'asc') {
      actions.setSortedByRate('desc');

      return;
    }
    if (sortedByRate === 'desc') {
      actions.setSortedByRate('asc');

      return;
    }

    actions.setSortedByRate(null);
  };

  const rateButtonVisible = !isM || (isM && !inputFocused);

  return (
    <div className={styles.panel} {...props}>
      <div
        className={classNames(styles.panel__input__wrapper, {
          [styles.panel__input_focused]: inputFocused,
        })}
      >
        <Input
          isFocused={inputFocused}
          setFocus={setInputFocused}
          value={search.value}
          onChange={onChangeInput}
          onClick={() => setInputFocused(true)}
          search={true}
          dataTestId={DataTestIds.InputSearch}
          placeholder='Поиск книги или автора…'
        />
        {rateButtonVisible && (
          <Button
            data-test-id={DataTestIds.SortRatingButton}
            color='secondary'
            className={styles.panel__sort}
            onClick={onChangeSorted}
          >
            <Icon icon={sortedByRate === 'desc' ? 'SortDesc' : 'SortAsc' || 'SortAsc'} />
            {!isM && <Typography variant='span'>По рейтингу</Typography>}
          </Button>
        )}
      </div>

      {isM && !inputFocused && (
        <div className={styles.panel__btns}>
          <Button
            data-test-id={DataTestIds.BtnMenuViewWindow}
            color={display === 'list' ? 'primary' : 'secondary'}
            onClick={() => actions.setVariantDisplay('list')}
            icon='SquareFour'
          />
          <Button
            data-test-id={DataTestIds.BtnMenuViewList}
            color={display === 'tile' ? 'primary' : 'secondary'}
            onClick={() => actions.setVariantDisplay('tile')}
            icon='Menu'
          />
        </div>
      )}
      {!isM && (
        <div className={styles.panel__btns}>
          <Button
            data-test-id={DataTestIds.BtnMenuViewWindow}
            color={display === 'list' ? 'primary' : 'secondary'}
            onClick={() => actions.setVariantDisplay('list')}
            icon='SquareFour'
          />
          <Button
            data-test-id={DataTestIds.BtnMenuViewList}
            color={display === 'tile' ? 'primary' : 'secondary'}
            onClick={() => actions.setVariantDisplay('tile')}
            icon='Menu'
          />
        </div>
      )}
    </div>
  );
};
