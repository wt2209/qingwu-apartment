import { ResponseListType } from '@/dataTypes/common';
import { CategoryListItem, RoomListItem } from '@/dataTypes/listItem';
import { Request, Response } from 'express';

let rooms: ResponseListType<RoomListItem> = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        roomName: '1-1-201',
        building: '1#',
        unit: '1单元',
        rent: 0,
        number: 1,
        remark: '说明',
      },
      {
        id: 2,
        roomName: '2-1-201',
        building: '2#',
        unit: '1单元',
        rent: 0,
        number: 1,
        remark: '说明',
      },
      {
        id: 3,
        roomName: '3-1-201',
        building: '3#',
        unit: '1单元',
        rent: 0,
        number: 1,
        remark: '说明',
      },
      {
        id: 4,
        roomName: '4-2-201',
        building: '4#',
        unit: '2单元',
        rent: 0,
        number: 1,
        remark: '说明',
      },
      {
        id: 5,
        roomName: '7-2-201',
        building: '7#',
        unit: '2单元',
        rent: 0,
        number: 4,
        remark: '说明',
      },
      {
        id: 6,
        roomName: '7-5-601',
        building: '7#',
        unit: '5单元',
        rent: 0,
        number: 6,
        remark: '说明',
      },
      {
        id: 7,
        roomName: '高2-102',
        building: '高2#',
        unit: '1-5层',
        rent: 0,
        number: 4,
        remark: '说明',
      },
      {
        id: 8,
        roomName: '高2-1002',
        building: '高2#',
        unit: '6-10层',
        rent: 0,
        number: 4,
        remark: '说明',
      },
      {
        id: 9,
        roomName: '高2-1202',
        building: '高2#',
        unit: '11-15层',
        rent: 1000,
        number: 4,
        remark: '说明',
      },
    ],
    pagination: {
      total: 1004,
      pageSize: 2,
      current: 3,
    },
  },
};

export default {
  'GET /api/rooms': (req: Request, res: Response) => {
    const { pageSize, current } = req.query;
    rooms.data.pagination.pageSize = parseInt(pageSize);
    rooms.data.pagination.current = parseInt(current);
    res.status(200).send(rooms);
  },
};
