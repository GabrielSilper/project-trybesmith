type Type = 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceData<T> = {
  type: Type | null;
  status: number;
  message: T;
};
