export type CommentDto = {
  rating: number;
  text: string;
  book: number;
  user: number;
};

export type CommentResponseDto = {
  data: CommentData;
  meta: Meta;
};

type CommentAttributes = {
  rating: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CommentData = {
  id: number;
  attributes: CommentAttributes;
};

type Meta = Record<string | number | symbol, unknown>;
