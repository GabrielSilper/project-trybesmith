export type ServiceData<T> = {
  type: string | null;
  status: number;
  message: T;
};
