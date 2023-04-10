import { createElement } from 'react';
import classNames from 'classnames';

import { TypographyProps, AllowTagsArray } from './typography-types';
import styles from './typography.module.scss';

export const Typography = ({ children, variant = 'p', className, ...props }: TypographyProps) => {
  const rightStyles = styles[`${variant}`];

  const tag = AllowTagsArray.includes(variant) ? variant : 'p';

  return createElement(tag, { ...props, className: classNames(className, rightStyles) }, children);
};
