import { ChargeRule } from './common';

export interface PersonListItem {
  id: number;
  name: string;
  gender: string;
  education: string;
  serial: string; // 工号
  identify: string;
  phone: string;
  department: string;
  hiredAt: string; // 入职时间
  enteredAt: string; // 此人入住公寓的时间
  contractStart: string;
  contractEnd: string;
  remark: string;
}

export interface CategoryListItem {
  id: number;
  title: string;
  type: 'person' | 'company';
  utilityType: string;
  chargeRules: ChargeRule[];
  remark: string;
  status?: 'show' | 'hide'; // 是否在主页面“选择楼号”中显示
}

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

export interface CompanyListItem {
  id: number;
  companyName: string;
  manager: string;
  managerPhone: string;
  linkman: string;
  linkmanPhone: string;
  enteredAt: string; // 公司入住公寓的时间
  remark: string;
}

export interface RecordListItem {
  id: number;
  type: 'person' | 'company';
  category: Partial<CategoryListItem>;
  room: Partial<RoomListItem>;
  company: Partial<CompanyListItem>;
  person: Partial<PersonListItem>;
  recordAt: string; // 此次记录的入住时间
  rentStart: string;
  rentEnd: string;
  status: 'living' | 'quitted' | 'moved'; // 在住，已退房，已调房
  toRoom?: string; // 调房到的房间
}

// 已房间为主题，计算出来的 “居住情况”
export interface LivingListItem {
  id: number;
  roomName: string;
  building: string;
  unit: string;
  number: number; // 最大人数
  remark: string; // 房间备注
  records: RecordListItem[];
}
