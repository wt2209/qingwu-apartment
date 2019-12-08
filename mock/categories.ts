import { ResponseListType } from '@/models/common';
import { CategoryListItem } from '@/dataTypes/listItem';
import { Request, Response } from 'express';

let categories: ResponseListType<CategoryListItem> = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        title: '新员工',
        type: 'person',
        utilityType: '收取超费',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRules: {
          床位费: [],
        },
        remark: '说明',
      },
      {
        id: 2,
        title: '单身职工',
        type: 'person',
        utilityType: '收取超费',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRules: {
          床位费: [430, 230, 230, 230, 230],
        },
        remark: '说明',
      },
      {
        id: 3,
        title: '随企业搬迁职工',
        type: 'person',
        utilityType: '全额收取',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRules: {
          床位费: [100],
        },
        remark: '说明',
      },
      {
        id: 4,
        title: '租赁',
        type: 'person',
        utilityType: '全额收取',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRules: {
          租赁房租: [900, 600, 700, 800],
          物业费: [98, 98, 98, 98],
        },
        remark: '说明',
      },
      {
        id: 5,
        title: '承包商公司',
        type: 'company',
        utilityType: '全额收取',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRules: {},
        remark: '说明123',
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
  'GET /api/categories': (req: Request, res: Response) => {
    const { pageSize, current } = req.query;
    categories.data.pagination.pageSize = parseInt(pageSize);
    categories.data.pagination.current = parseInt(current);
    res.status(200).send(categories);
  },

  'POST /api/categories': (req: Request, res: Response) => {
    const body = { ...req.body, id: 1001 };

    setTimeout(() => {
      res.status(200).send({
        status: 'ok',
        data: body,
      });
    }, 1000);
  },
};
