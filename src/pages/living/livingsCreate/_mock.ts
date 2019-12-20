import { Request, Response } from 'express';
import { OptionsType } from './model';
import { ResponseItemType } from '@/models/common';

const options: ResponseItemType<OptionsType> = {
  status: 'ok',
  data: {
    categories: [
      { id: 1, title: '新职工', type: 'person' },
      { id: 2, title: '单身职工', type: 'person' },
      { id: 3, title: '租赁', type: 'person' },
      { id: 4, title: '承包商公司', type: 'company' },
      { id: 5, title: '仓库', type: 'functional' },
    ],
    companies: [
      { id: 1, companyName: '公司噶士大夫就1' },
      { id: 2, companyName: '公司噶士大夫就2' },
      { id: 3, companyName: '公司噶士大夫就3' },
      { id: 4, companyName: '公司噶士大夫就4' },
      { id: 5, companyName: '公司噶士大夫就5' },
      { id: 6, companyName: '公司噶士大夫就6' },
    ],
    feeTypes: [
      { id: 1, title: '租赁房租' },
      { id: 2, title: '租赁物业费' },
      { id: 3, title: '租赁电梯费' },
      { id: 4, title: '单身床位费' },
      { id: 5, title: '单身电费' },
      { id: 6, title: '租赁电费' },
      { id: 7, title: '租赁水费' },
    ],
  },
};

export default {
  'GET /api/livings/select-options': (req: Request, res: Response) => {
    setTimeout(() => {
      res.status(200).send(options);
    }, 1000);
  },
};
