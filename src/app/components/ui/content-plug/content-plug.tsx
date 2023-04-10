import classNames from 'classnames';

import { ContentPlugProps } from './content-plug-types';

import styles from './content-plug.module.scss';

export const ContentPlug = ({ plugContent, type, children, className, ...props }: ContentPlugProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.plug, styles[`${type}`], className)} {...props}>
        {plugContent}
      </div>
      {children}
    </div>
  );
};
