import { Comment, Delivery } from '../rtk/book';

export type AccountResponseDto = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
  role: AccountRole;
  comments: AccountComment[];
  avatar: string;
  booking: AccountBooking;
  delivery: AccountDelivery;
  history: AccountHistory;
};

export type AccountComment = {
  id: number;
  rating: number;
  text: string;
  bookId: number;
};

export type AccountDelivery = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: AccountBook;
};

export type AccountBooking = {
  id: number;
  order: boolean;
  dateOrder: Date;
  book: AccountBook;
};

export type AccountBook = {
  id: number;
  title: string;
  rating: number;
  issueYear: null | string;
  authors: string[];
  image: null | string;
};

export type AccountHistory = {
  id: number;
  books: AccountBook[];
};

export type AccountRole = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type AccountInfo = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type AccountInfoDto = Partial<AccountInfo>;

//! ACCOUNT AVATAR UPLOAD
export type AccountAvatarDto = {
  avatar: 6;
};

export type UploadAccountAvatarDto = {
  file: File;
};

export type AccountAvatarResponseDto = {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
};

export type ImageFormats = {
  thumbnail: AccountImage;
  large: AccountImage;
  medium: AccountImage;
  small: AccountImage;
};

export type AccountImage = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
};
