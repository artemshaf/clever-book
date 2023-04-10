export type RequestError = {
  data: unknown;
  error: ApiError;
};

export type ApiError = {
  status: number;
  name: string;
  message: string;
  details: unknown[];
};
