export interface BillListItem {
  id: number;
  roomName: string;
  name: string;
  type: string;
  money: number;
  description: string; // 费用说明
  remark: string; //  备注
  createdAt: string;
  chargedAt: string;
}
