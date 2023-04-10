export type BookingDto = {
  order: boolean;
  dateOrder: string;
  book: number;
  customer: number;
};

export interface BookingAttributes {
  order: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  dateOrder: string;
}

export interface BookingData {
  id: number;
  attributes: BookingAttributes;
}

type Meta = Record<string | number | symbol, unknown>;

export type BookingResponseDto = {
  data: BookingData;
  meta: Meta;
};
