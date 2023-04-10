export type Image = {
  url: string;
};

export type History = {
  id: number;
  userId: number;
};

export type BookListItem = {
  id: number;
  title: string;
  rating?: number | null;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  image: Image | null;
  categories: string[];
  comments?: string[] | null;
  booking?: Booking | null;
  delivery?: Delivery | null;
  histories: History[];
};

export type UserComment = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type Comment = {
  id: number;
  rating: number;
  text: string;
  createdAt: Date;
  user: UserComment;
};

export type Booking = {
  id: number;
  order: boolean;
  dateOrder: Date;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
};

export type Delivery = {
  id: number;
  handed: boolean;
  dateHandedFrom: Date;
  dateHandedTo: Date;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
};

export type Book = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: Image[];
  categories: string[];
  comments: Comment[] | null;
  booking: Booking;
  delivery: Delivery;
  histories: History[];
};

export type BookInfo = {
  issueYear: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  genre: string;
};

export type Genre = {
  name: string;
  path: string;
  id: number;
};
