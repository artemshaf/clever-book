import { memo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { getKey } from '@helpers';

import { BreadcrumbsProps } from './breadcrumbs-types';

import styles from './breadcrumbs.module.scss';

export const Breadcrumbs = memo(({ crumbs, className, ...props }: BreadcrumbsProps) => {
  if (crumbs) {
    return (
      <ul className={classNames(styles.breadcrumbs, className)} {...props}>
        {crumbs.map((item, index) =>
          index === crumbs.length - 1 ? (
            <li
              data-test-id={item.dataTestId}
              className={classNames(styles.breadcrumbs__item, styles.last)}
              key={getKey()}
            >
              {item.name}
            </li>
          ) : (
            <Link onClick={item.onClick} data-test-id={item.dataTestId} to={item.path}>
              <li className={styles.breadcrumbs__item} key={getKey()}>
                {item.name}
              </li>
            </Link>
          )
        )}
      </ul>
    );
  }

  return null;
});
