import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipType = 'hover' | 'click' | 'both';

export type TooltipProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  position?: TooltipPosition;
  content: JSX.Element | ReactNode;
  type?: TooltipType;
  delay?: number;
};
