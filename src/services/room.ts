import request from '@/utils/request';

export interface RoomFetchParams {
  current: number;
  pageSize: number;
  roomName?: string;
  building?: string;
}
export async function query(params: RoomFetchParams): Promise<any> {
  return request('/api/rooms', {
    params,
  });
}

export interface RoomStoreData {
  roomName: string;
  building: string;
  unit: string;
  number: number;
  rent?: number;
  remark?: string;
}
export async function store(data: RoomStoreData): Promise<any> {
  return request.post('/api/rooms', {
    method: 'post',
    data,
  });
}
