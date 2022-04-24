export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface Page<T> {
  current: number;
  pages: number;
  records: T[];
  size: number;
  total: number;
}
