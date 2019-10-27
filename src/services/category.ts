import request from '@/utils/request';

export interface CategoryQueryParams {
  pageSize: number;
  currentPage: number;
  sorter?: string;
  status?: string;
  name?: string;
}

export async function queryCategories(params: CategoryQueryParams): Promise<any> {
  return request('/api/categories', {
    params,
  });
}
