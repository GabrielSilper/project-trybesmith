type Type = 'UNAUTHORIZED';

export type ServiceData<T> = {
  type: Type | null;
  status: number;
  message: T;
};
