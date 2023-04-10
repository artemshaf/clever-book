import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BreadCrumbRoute } from '@types';

export type BreadcrumbsProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  crumbs: BreadCrumbRoute[];
};
