// eslint-disable-next-line import/no-extraneous-dependencies
import classNames from 'classnames';
import { RecoveryPassword } from '../../components';

import { IRecoveryPageInterface } from './recovery-page-interface';

import styles from './recovery-page.module.scss';

export const RecoveryPage = ({ className, ...props }: IRecoveryPageInterface) => {
  console.log(styles);

  return (
    <div className={styles.recoveryPage} {...props}>
      <RecoveryPassword />
    </div>
  );
};
