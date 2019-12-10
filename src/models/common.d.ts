// model 中使用的 listdata
export interface ListData<T> {
  list: T[];
  pagination: Partial<Pagination>;
}

// 缴费规则
export interface ChargeRule {
  [key: string]: number[];
}

// 后端返回的数组结果
export interface ResponseListType<T> {
  status: 'ok' | 'error';
  errMsg?: string;
  data: ListData<T>;
}

// 后端返回的单个结果
export interface ResponseItemType {
  status: 'ok' | 'error';
  errMsg?: string;
  data?: Object;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}
