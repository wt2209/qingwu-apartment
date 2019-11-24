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
}

export interface RoomListItem {
  id: number;
  category: Partial<CategoryListItem>;
  roomName: string;
  building: string;
  unit: string;
  number: number; // 最大人数
  remark: string; // 房间备注
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
  category: Partial<CategoryListItem>;
  roomName: string;
  building: string;
  unit: string;
  number: number; // 最大人数
  remark: string; // 房间备注
  records: RecordListItem[];
}
