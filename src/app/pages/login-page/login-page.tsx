import { Login } from '../../components';

import { ILoginPageInterface } from './login-page-interface';

import styles from './login-page.module.scss';

export const LoginPage = ({ className, ...props }: ILoginPageInterface) => {
  return (
    <div className={styles.loginPage} {...props}>
      <Login />
    </div>
  );
};
