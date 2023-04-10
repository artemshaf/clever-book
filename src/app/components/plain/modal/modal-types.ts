import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ModalActions = {
  open: boolean;
  setOpen: (variant: boolean) => void;
};

export type ModalProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  ModalActions & {
    withClose?: boolean;
  };
