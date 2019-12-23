import { CategoryListItem } from '../categories/data.d';
import { RoomListItem } from '../rooms/data.d';
import { CompanyListItem } from '../companies/data.d';
import { PersonListItem } from '../people/data.d';

export interface RecordListItem {
  id: number;
  type: 'person' | 'company' | 'functional';
  category: Partial<CategoryListItem>;
  room: Partial<RoomListItem>;
  company: Partial<CompanyListItem>;
  person: Partial<PersonListItem>;
  recordAt: string; // 此次记录的入住时间
  rentStart: string;
  rentEnd: string;
  status: 'using' | 'quitted' | 'moved'; // 在住，已退房，已调房
  toRoom?: string; // 调房到的房间
}
