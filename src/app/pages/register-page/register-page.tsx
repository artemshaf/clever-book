import classNames from 'classnames';
import { Register } from '../../components';

import { IRegisterPageInterface } from './register-page-interface';

import styles from './register-page.module.scss';

export const RegisterPage = ({ className, ...props }: IRegisterPageInterface) => {
  return (
    <div className={classNames(styles.registerPage, className)} {...props}>
      <Register />
    </div>
  );
};
