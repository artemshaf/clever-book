import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useEffect, useState } from 'react';

import { Icon, Typography } from '@components';
import { generateMenuData, getKey, isNumeric } from '@helpers';
import { selectBooksState, selectGenresState, storeActions, useActions, useAppSelector } from '@store';
import { INestedMenuItem, menuItems, menuItemsPhone } from '@data';
import { PAGES } from '@utils';
import { DataTestIds } from '@types';
import { useMatchMedia } from '@hooks';

import { MenuListProps, MenuItem, MenuListItem } from './menu-list-types';
import styles from './menu-list.module.scss';

const isItemOpen = (route: string, pathname: string, pos = 1) => pathname.split('/')[pos] === route.split('/')[pos];

const ListItem: React.FC<MenuItem> = ({ item, setMenuOpen }) => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(() => isItemOpen(item.path, pathname));
  const actions = useActions(storeActions);

  return (
    <li>
      {item.items ? (
        <>
          <button
            className={styles.title__button}
            type='button'
            data-test-id={item.dataTestId || 'navigation-showcase'}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <Typography
              className={cn(styles.choosed__title, {
                [styles.choosed__title_active]: isItemOpen(item.path, pathname),
              })}
            >
              {item.name}
              {isOpen ? <Icon icon='Down' /> : <Icon icon='Up' />}
            </Typography>
          </button>
          <ul style={{ display: isOpen ? 'flex' : 'none' }}>
            {item.items.map(
              (child) =>
                !child.items && (
                  <li key={getKey()}>
                    <Link
                      onClick={(e) => {
                        e.stopPropagation();

                        actions.setSelectedGenre({ name: child.name, path: child.path });

                        if (setMenuOpen) {
                          setMenuOpen();
                        }
                      }}
                      to={`${PAGES.BOOKS_CATEGORIES_FOR_MENU + child.path}`}
                    >
                      <Typography
                        data-test-id={child.dataTestId || ''}
                        className={cn({
                          [styles.choosed__item]: pathname === `${PAGES.BOOKS_CATEGORIES_FOR_MENU + child.path}`,
                        })}
                        variant='span'
                      >
                        {child.name}
                      </Typography>
                      {!isNumeric(child.itemsCount) && (
                        <Typography
                          data-test-id={child.dataTestIdCount || ''}
                          className={styles['books-count']}
                          variant='span'
                        >
                          {child.itemsCount}
                        </Typography>
                      )}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </>
      ) : (
        <Link
          data-test-id={item.dataTestId || ''}
          to={item.path}
          onClick={(e) => {
            e.stopPropagation();

            if (setMenuOpen) {
              setMenuOpen();
            }
          }}
        >
          <Typography
            className={cn({
              [styles.choosed__title]: pathname === item.path,
            })}
            variant='p'
          >
            {item.name}
          </Typography>
        </Link>
      )}
    </li>
  );
};

const List: React.FC<MenuListItem> = ({ items, setMenuOpen }) => {
  return (
    <ul key={getKey()} className={styles.menu}>
      {items.map((item) => (
        <ListItem setMenuOpen={setMenuOpen} item={item} key={getKey()} />
      ))}
    </ul>
  );
};

export const MenuList = ({ setMenuOpen, isMenuOpen, className, ...props }: MenuListProps) => {
  const { isL } = useMatchMedia();
  const [menuData, setMenuData] = useState<INestedMenuItem[]>();
  const { genres } = useAppSelector(selectGenresState);
  const { books } = useAppSelector(selectBooksState);

  const actions = useActions(storeActions);
  const mockMenu = isL ? menuItemsPhone : menuItems;

  useEffect(() => {
    if (!genres) {
      return;
    }

    let data;

    if (books) {
      data = generateMenuData(genres, mockMenu, isL ? DataTestIds.Burger : DataTestIds.Navigation, books);
    } else {
      data = generateMenuData(genres, mockMenu);
    }

    setMenuData(data);
  }, [isL, books, actions, genres, mockMenu]);

  return (
    <nav role='navigation' className={cn(styles.menu, className)} {...props}>
      <List setMenuOpen={setMenuOpen} items={menuData || mockMenu} />
    </nav>
  );
};
