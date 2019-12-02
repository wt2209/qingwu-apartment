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
