import classNames from 'classnames';

import { Logo, Socials, Typography } from '@components';
import { FooterProps } from './footer-types';

import styles from './footer.module.scss';

export const Footer = ({ className, ...props }: FooterProps) => (
  <footer className={classNames(styles.footer, className)} {...props}>
    <Typography variant='span'>© 2020-{new Date().getFullYear()} Cleverland. Все права защищены.</Typography>
    <Socials />
  </footer>
);
