import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type ContentPlug = 'empty' | 'error';

export type ContentPlugProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  type: ContentPlug;
  plugContent?: JSX.Element | ReactNode;
};
