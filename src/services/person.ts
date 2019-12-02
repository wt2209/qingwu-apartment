import request from '@/utils/request';

export interface PersonFetchParams {
  current: number;
  pageSize: number;
  name?: string;
  serial?: string;
  identify?: string;
  department?: string;
}
export async function query(params: PersonFetchParams): Promise<any> {
  return request('/api/people', {
    params,
  });
}
