export interface RoomListItem {
  id: number;
  roomName: string;
  building: string;
  unit: string;
  rent: number; // 房间的默认租金，如承包商公寓的房间租金。入住时，可使用此租金，也可自定义新租金
  number: number; // 最大人数
  remark: string; // 房间备注
  status?: 'show' | 'hide'; // 是否在主页面中显示
}

export interface RoomFormValueType {
  id: number;
  roomName: string;
  building: string;
  unit: string;
  number: number | undefined;
  rent: number | undefined;
  remark: string;
}
