import { DetailedHTMLProps, HTMLAttributes } from 'react';

type SelectionType = 'rect' | 'circle';

export type CropImageProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  file: File;
  selectionType?: SelectionType;
  onSave: (croppedImage: string) => void;
};
