import request from '@/utils/request';

export interface LivingFetchParams {
  keyword?: string;
  selectedCategory?: string;
  selectedBuilding?: string;
  selectedUnit?: string;
}
export async function query(params: LivingFetchParams): Promise<any> {
  return request('/api/livings', {
    params,
  });
}
