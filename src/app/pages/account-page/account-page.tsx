import { Account } from '@components';
import { useDocumentTitle } from 'usehooks-ts';

import styles from './account-page.module.scss';

export const AccountPage = () => {
  useDocumentTitle('Личный кабинет');

  return (
    <div className={styles.accountPage}>
      <Account />
    </div>
  );
};
