import request from '@/utils/request';

export async function query(params = {}): Promise<any> {
  return request('/api/categories', {
    params,
  });
}
