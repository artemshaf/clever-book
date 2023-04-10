export * from './rtk';
export * from './rtk-dto';
export * from './errors';
export * from './token';
export * from './data-test';
export * from './enums';

export enum StateStatus {
  Idle = 'idle',
  Pending = 'pending',
  Failed = 'failed',
  Succeeded = 'succeeded',
}

export type BreadCrumbRoute = {
  path: string;
  name: string;
  dataTestId?: string;
  onClick?: () => void;
};
