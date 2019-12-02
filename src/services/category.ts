import request from '@/utils/request';

export interface CategoryFetchParams {
  current: number;
  pageSize: number;
}
export async function query(params: CategoryFetchParams): Promise<any> {
  return request('/api/categories', {
    params,
  });
}
