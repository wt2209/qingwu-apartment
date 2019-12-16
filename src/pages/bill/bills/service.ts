import request from '@/utils/request';

export interface BillFetchParams {
  current: number;
  pageSize: number;
}
export async function query(params: BillFetchParams): Promise<any> {
  return request('/api/bills', {
    params,
  });
}

export async function store(): Promise<any> {}
export async function update(): Promise<any> {}
