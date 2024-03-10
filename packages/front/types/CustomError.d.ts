export type CustomError = {
  code: number;
  name?: string;
  title?: string;
  message: string;
  stack?: string | object;
  timestamp?: number;
};
