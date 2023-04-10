import classNames from 'classnames';
import { useDocumentTitle } from 'usehooks-ts';

import { Calendar, NestedList, WithMenu } from '../../components';
import { offerPageData } from '../../data';

import { IOfferPageInterface } from './offer-page-interface';

import styles from './offer-page.module.scss';

export const OfferPage = ({ className, ...props }: IOfferPageInterface) => {
  useDocumentTitle('Договор офёрты');

  return (
    <WithMenu className={classNames(styles.offerPage, className)} {...props}>
      <NestedList list={offerPageData} />
    </WithMenu>
  );
};
