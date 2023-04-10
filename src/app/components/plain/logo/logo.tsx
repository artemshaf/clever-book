import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { PAGES } from '@utils';
import { Icon, Typography } from '@components';

import { LogoProps } from './logo-types';
import styles from './logo.module.scss';

export const Logo = ({ className, ...props }: LogoProps) => (
  <div {...props}>
    <Link to={`${PAGES.HOME}`} className={classNames(className, styles.logo)}>
      <Icon icon='Logo' />
      <Typography className={styles.logo__text} variant='span'>
        Cleverland
      </Typography>
    </Link>
  </div>
);
