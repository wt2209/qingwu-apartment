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
  emergencyPerson?: string;
  emergencyPhone?: string;
  origin?: string; // 籍贯
  remark?: string;
}
