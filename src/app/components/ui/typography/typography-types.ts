import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type AllowTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p';
export const AllowTagsArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p'];
type TypographyVariant =
  | AllowTags
  | 'subtitle-l'
  | 'subtitle-s'
  | 'body-l'
  | 'body-s'
  | 'info-l'
  | 'info-s'
  | 'button-l'
  | 'button-s';

export type TypographyProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  variant?: TypographyVariant;
  children: JSX.Element | ReactNode;
};
