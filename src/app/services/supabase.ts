export type SupabaseResponse<T> = {
  response: T;
};

export type SupabaseGenericResponse<T> = {
  response: {
    error: string;
    data: Array<T>;
    count?: number;
    status?: number;
    statusText?: string;
  };
};
