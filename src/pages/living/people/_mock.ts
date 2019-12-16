import { Request, Response } from 'express';
import { ResponseListType } from '@/models/common';
import { PersonListItem } from '@/pages/living/people/data';

let people: ResponseListType<PersonListItem> = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        name: '张三',
        gender: '男',
        education: '本科',
        serial: '100101',
        identify: '42011989111109872345',
        department: '质量控制部',
        phone: '13333333333',
        hiredAt: '2011-11-11',
        enteredAt: '2011-11-11',
        contractStart: '',
        contractEnd: '',
        remark: '',
      },
      {
        id: 2,
        name: '张三2',
        gender: '男',
        education: '本科',
        serial: '100101',
        identify: '42011989111109872345',
        department: '质量控制部',
        phone: '13333333333',
        hiredAt: '2011-11-11',
        enteredAt: '2011-11-11',
        contractStart: '',
        contractEnd: '',
        remark: '',
      },
      {
        id: 3,
        name: '张三3',
        gender: '男',
        education: '本科',
        serial: '100101',
        identify: '42011989111109872345',
        department: '质量控制部',
        phone: '13333333333',
        hiredAt: '2011-11-11',
        enteredAt: '2011-11-11',
        contractStart: '',
        contractEnd: '',
        remark: '',
      },
      {
        id: 4,
        name: '张三4',
        gender: '男',
        education: '本科',
        serial: '100101',
        identify: '42011989111109872345',
        department: '质量控制部',
        phone: '13333333333',
        hiredAt: '2011-11-11',
        enteredAt: '2011-11-11',
        contractStart: '',
        contractEnd: '',
        remark: '',
      },
      {
        id: 5,
        name: '张三5',
        gender: '男',
        education: '本科',
        serial: '100101',
        identify: '42011989111109872345',
        department: '质量控制部',
        phone: '13333333333',
        hiredAt: '2011-11-11',
        enteredAt: '2011-11-11',
        contractStart: '',
        contractEnd: '',
        remark: '',
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
  'GET /api/people': (req: Request, res: Response) => {
    const { pageSize, current } = req.query;
    people.data.pagination.pageSize = parseInt(pageSize);
    people.data.pagination.current = parseInt(current);
    res.status(200).send(people);
  },
};
