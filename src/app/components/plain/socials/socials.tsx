import classNames from 'classnames';

import { socialsList } from '@data';
import { getKey } from '@helpers';

import { SocialsProps } from './socials-types';
import styles from './socials.module.scss';

const mockItems = socialsList;

export const Socials = ({ items = mockItems, className, ...props }: SocialsProps) => (
  <ul className={classNames(styles.socials, className)} {...props}>
    {socialsList.map((item) => (
      <li key={getKey()}>
        <a href={item.link}>{item.icon ? item.icon : item.text}</a>
      </li>
    ))}
  </ul>
);
