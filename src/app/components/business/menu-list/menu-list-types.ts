import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { INestedMenuItem } from '../../../data';

export type MenuListProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  items?: INestedMenuItem[];
  isMenuOpen?: boolean;
  setMenuOpen?: () => void;
};

export type MenuListItem = {
  items: INestedMenuItem[];
  isMenuOpen?: boolean;
  setMenuOpen?: () => void;
};

export type MenuItem = {
  item: INestedMenuItem;
  isMenuOpen?: boolean;
  setMenuOpen?: () => void;
};
