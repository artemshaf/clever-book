import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SelectItem = {
  value: string;
  label: string;
};

export type SelectProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  selectDataTestId?: string;
  data: SelectItem[];
  startSelected?: SelectItem;
  onChangeAction: (item: SelectItem) => void;
};
