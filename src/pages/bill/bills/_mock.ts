import { Request, Response } from 'express';
import { ResponseListType } from '@/models/common';
import { BillListItem } from './data';

let bills: ResponseListType<BillListItem> = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        roomName: '10-1-101',
        name: '张三',
        type: '租赁房租',
        money: 1800,
        description: '第一季度',
        remark: '',
        createdAt: '2019-11-11',
        chargedAt: '2019-11-12',
      },
      {
        id: 2,
        roomName: '10-1-101',
        name: '张三',
        type: '租赁房租',
        money: 1800,
        description: '第一季度',
        remark: '',
        createdAt: '2019-11-11',
        chargedAt: '2019-11-12',
      },
      {
        id: 3,
        roomName: '10-1-101',
        name: '张三',
        type: '租赁房租',
        money: 1800,
        description: '第一季度',
        remark: '',
        createdAt: '2019-11-11',
        chargedAt: '2019-11-12',
      },
      {
        id: 4,
        roomName: '10-1-101',
        name: '张三',
        type: '租赁房租',
        money: 1800,
        description: '第一季度',
        remark: '',
        createdAt: '2019-11-11',
        chargedAt: '2019-11-12',
      },
    ],
    pagination: {
      total: 200,
      pageSize: 2,
      current: 3,
    },
  },
};

export default {
  'GET /api/bills': (req: Request, res: Response) => {
    const { pageSize, current } = req.query;
    bills.data.pagination.pageSize = parseInt(pageSize);
    bills.data.pagination.current = parseInt(current);
    res.status(200).send(bills);
  },

  'POST /api/bills': (req: Request, res: Response) => {
    const body = { ...req.body, id: 1001 };

    setTimeout(() => {
      res.status(200).send({
        status: 'ok',
        data: body,
      });
    }, 1000);
  },

  'PUT /api/bills': (req: Request, res: Response) => {
    const body = { ...req.body };

    setTimeout(() => {
      res.status(200).send({
        status: 'ok',
        data: body,
      });
    }, 1000);
  },
};
