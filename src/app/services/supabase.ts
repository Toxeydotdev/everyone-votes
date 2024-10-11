export type SupabaseResponse<T> = {
  response: {
    error: string;
    data: Array<T>;
    count: number;
    status: number;
    statusText: string;
  };
};
