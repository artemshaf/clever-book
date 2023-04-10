/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import { useAccount, useBodyLock, useIsLogin, useMatchMedia } from '@hooks';
import { storeActions, useActions } from '@store';
import { PAGES } from '@utils';
import { Logo, MenuList, Tooltip, Button, Divider, Typography, UserBlock } from '@components';

import { HeaderProps } from './header-types';

import styles from './header.module.scss';
import { DataTestIds } from '@types';

type TooltipContentProps = {
  onClick?: () => void;
};

const TooltipContent: FC<TooltipContentProps> = ({ onClick }) => {
  const actions = useActions(storeActions);
  const { removeToken } = useIsLogin();
  const { removeAccount } = useAccount();

  return (
    <ul className={styles.tooltip__list}>
      <li
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <>
          <Link data-test-id={DataTestIds.ProfileButton} to={PAGES.ACCOUNT}>
            Профиль
          </Link>
        </>
      </li>
      <li
        data-test-id={DataTestIds.ExitButton}
        onClick={() => {
          actions.setAccountInitial();
          removeAccount();
          removeToken();

          if (onClick) {
            onClick();
          }
        }}
      >
        <Link to={PAGES.LOGIN}>Выход</Link>
      </li>
    </ul>
  );
};

export const Header = ({ className, ...props }: HeaderProps) => {
  const { isL } = useMatchMedia();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  useBodyLock(isL && isOpen);
  useOnClickOutside(menuRef, onCloseMenu);

  return (
    <>
      <header className={classNames(styles.header, className)} {...props}>
        {!isL && (
          <Button
            data-test-id={DataTestIds.ButtonBurger}
            style={{ display: 'none' }}
            onClick={(e) => {
              e.stopPropagation();

              setIsOpen((prev) => !prev);
            }}
            className={styles.menu__icon}
            type='button'
            color='secondary'
            icon={isOpen ? 'Close' : 'Menu'}
          />
        )}
        {isL && (
          <div ref={menuRef} className={styles.menu__block}>
            <Button
              data-test-id={DataTestIds.ButtonBurger}
              onClick={(e) => {
                e.stopPropagation();

                setIsOpen((prev) => !prev);
              }}
              className={styles.menu__icon}
              type='button'
              color='secondary'
              icon={isOpen ? 'Close' : 'Menu'}
            />
            <div
              className={classNames(styles.menu__wrapper, {
                [styles.menu__wrapper_hide]: !isOpen,
              })}
            >
              <MenuList
                isMenuOpen={isOpen}
                setMenuOpen={() => {
                  setIsOpen((prev) => !prev);
                }}
                className={styles.menu}
              />
              <Divider />
              <TooltipContent
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        )}
        <Logo style={isL ? { display: 'none' } : {}} />
        <Typography className={styles.name} variant='h3'>
          Библиотека
        </Typography>
        {!isL && (
          <>
            <div>
              <Tooltip position='bottom' className={styles.tooltip__wrapper} content={<TooltipContent />}>
                <UserBlock className={styles.account} />
              </Tooltip>
            </div>
          </>
        )}
      </header>
    </>
  );
};
