export interface DataServiceState<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}
