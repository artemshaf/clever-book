import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ImageSize } from '../../ui/user-avatar/user-avatar-types';

type UserBlock = 'welcome' | 'account';
export type UserBlockProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  img?: string;
  type?: UserBlock;
  avatarProps?: ImageSize;
  handleFileSelect?: (file: File) => void;
};
