import { ResponseListType } from '@/models/common';

const categories: ResponseListType = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        title: '职工',
        type: 'person',
        utilityRule: '收取超费',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRule: [],
        remark: '说明',
      },
      {
        id: 2,
        title: '承包商',
        type: 'company',
        utilityRule: '全额收取',
        // 默认的其他收费规则，作为入住记录收费规则的参考
        chargeRule: [
          {
            name: '租赁房租',
            fee: [1000, 700, 800, 900],
          },
        ],
        remark: '说明123',
      },
    ],
    pagination: {
      total: 20,
      pageSize: 2,
      current: 3,
    },
  },
};

export default {
  'GET /api/categories': categories,
};
