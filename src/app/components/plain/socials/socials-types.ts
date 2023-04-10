import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ISocial } from '../../../data/socials';

export type SocialsProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> & {
  items?: ISocial[];
};
