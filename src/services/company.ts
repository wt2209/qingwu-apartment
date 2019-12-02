import request from '@/utils/request';

export interface CompanyFetchParams {
  current: number;
  pageSize: number;
  companyName?: string;
  manager?: string;
  linkman?: string;
}
export async function query(params: CompanyFetchParams): Promise<any> {
  return request('/api/companies', {
    params,
  });
}
