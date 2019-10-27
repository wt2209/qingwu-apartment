export interface DefaultPagination {
  total: number;
  pageSize: number;
  current: number;
}

// 缴费规则
export interface ChargeRule {
  name: string;
  fee: Array<number>;
  discountType: 'money' | 'percent';
  discount: Array<number>;
}

// 后端返回的数组结果
export interface ResponseListType {
  status: 'ok' | 'error';
  errMsg?: string;
  data?: {
    list: Array<any>;
    pagination: Object;
  };
}

// 后端返回的单个结果
export interface ResponseItemType {
  status: 'ok' | 'error';
  errMsg?: string;
  data?: Object;
}
