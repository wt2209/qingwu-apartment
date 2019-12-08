import request from '@/utils/request';
import { ChargeRule } from '@/models/common';

export interface CategoryFetchParams {
  current: number;
  pageSize: number;
}
export async function query(params: CategoryFetchParams): Promise<any> {
  return request('/api/categories', {
    params,
  });
}

export interface CategoryStoreData {
  title: string;
  type: 'person' | 'company' | 'functional';
  utilityType: string;
  chargeRules: ChargeRule[];
  remark: string;
}
export async function store(data: CategoryStoreData): Promise<any> {
  return request.post('/api/categories', {
    method: 'post',
    data,
  });
}
