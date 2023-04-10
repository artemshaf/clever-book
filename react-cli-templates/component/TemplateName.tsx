import classNames from 'classnames';

import { ITemplateNameInterface } from './templateName-interface';

import styles from './templateName.module.scss';

export const TemplateName = ({ className, ...props }: ITemplateNameInterface) => {
  return (
    <div className={classNames(styles.templateName, className)} {...props}>
      TemplateName Component
    </div>
  );
};
