import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export type ImageSize = 'l' | 'm' | 's';

export type UserAvatarProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  size?: ImageSize;
};
