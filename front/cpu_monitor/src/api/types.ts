export type TBaseResponse<T> = {
  ok: boolean;
  description: string;
  data?: T;
};
