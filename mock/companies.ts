import { ResponseListType } from '@/models/common';
import { Request, Response } from 'express';
import { CompanyListItem } from '@/pages/companies/data';

let companies: ResponseListType<CompanyListItem> = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        companyName: '青岛顺兴通达钢结构有限公司',
        manager: '张三',
        managerPhone: '13333333333',
        linkman: '李四',
        linkmanPhone: '13434343434',
        enteredAt: '2019-11-12',
        remark: '公司的备注',
      },
      {
        id: 2,
        companyName: '青岛顺兴通达钢结构有限公司',
        manager: '张三',
        managerPhone: '13333333333',
        linkman: '李四',
        linkmanPhone: '13434343434',
        enteredAt: '2019-11-12',
        remark: '公司的备注',
      },
      {
        id: 3,
        companyName: '青岛顺兴通达钢结构有限公司',
        manager: '张三',
        managerPhone: '13333333333',
        linkman: '李四',
        linkmanPhone: '13434343434',
        enteredAt: '2019-11-12',
        remark: '公司的备注',
      },
      {
        id: 4,
        companyName: '青岛顺兴通达钢结构有限公司',
        manager: '张三',
        managerPhone: '13333333333',
        linkman: '李四',
        linkmanPhone: '13434343434',
        enteredAt: '2019-11-12',
        remark: '公司的备注',
      },
      {
        id: 5,
        companyName: '青岛顺兴通达钢结构有限公司',
        manager: '张三',
        managerPhone: '13333333333',
        linkman: '李四',
        linkmanPhone: '13434343434',
        enteredAt: '2019-11-12',
        remark: '公司的备注',
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
  'GET /api/companies': (req: Request, res: Response) => {
    const { pageSize, current } = req.query;
    companies.data.pagination.pageSize = parseInt(pageSize);
    companies.data.pagination.current = parseInt(current);
    res.status(200).send(companies);
  },
};
