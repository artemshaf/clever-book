import { DetailedHTMLProps, HTMLAttributes } from 'react';

type FileSelectorAccept = '.jpg' | '.pdf' | '.doc.' | 'audio/*' | 'video/*' | 'image/*' | 'audio/*';

export type FileSelectorProps = DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  onFileSelect: (file: File) => void;
  accept?: FileSelectorAccept;
};
