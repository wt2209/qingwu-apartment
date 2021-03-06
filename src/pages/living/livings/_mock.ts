import { Request, Response } from 'express';

let livings = {
  status: 'ok',
  data: {
    list: [
      {
        id: 1,
        roomName: '1-1-102',
        building: '1#',
        unit: '1单元',
        number: 0,
        remark: '房间的说明',
        records: [
          {
            id: 1,
            type: 'company',
            category: {
              type: 'company',
              title: '包商公司',
            },
            room: {
              roomName: '1-1-101',
            },
            company: {
              companyName: '青岛商剑鸣大传播工程有限公司',
              manager: '张三',
              managerPhone: '13333333333',
              linkman: '李四',
              linkmanPhone: '13345673456',
              remark: '这是一个公司的备注',
            },
            person: {},
            recordAt: '2019-11-11',
            rentStart: '2019-12-1',
            rentEnd: '2020-12-3',
            status: 'using',
          },
        ],
      },
      {
        id: 2,
        roomName: '3-3-101',
        building: '3#',
        unit: '3单元',
        number: 4,
        remark: '房间的说明',
        records: [
          {
            id: 3,
            type: 'person',
            category: {
              type: 'person',
              title: '新职工',
            },
            room: {
              roomName: '3-3-101',
            },
            company: {},
            person: {
              id: 11,
              name: '张三',
              gender: '男',
              enteredAt: '2011-8-7',
              education: '本科',
              serial: '11050487',
              identify: '1305221998080190887',
              phone: '13333333333',
              department: '资产财务部',
              contractStart: '1990-12-1',
              contractEnd: '无固定期',
              remark: '备注',
            },
            recordAt: '2019-11-11',
            rentStart: '',
            rentEnd: '',
            status: 'using',
          },
          {
            id: 4,
            type: 'person',
            category: {
              type: 'person',
              title: '单身职工',
            },
            room: {
              roomName: '3-3-101',
            },
            company: {},
            person: {
              id: 12,
              name: '张三2',
              gender: '男',
              enteredAt: '2011-8-7',
              education: '本科',
              serial: '11050487',
              identify: '1305221998080190887',
              phone: '13333333333',
              department: '资产财务部',
              contractStart: '1990-12-1',
              contractEnd: '无固定期',
              remark: '备注',
            },
            recordAt: '2019-11-11',
            rentStart: '2019-11-11',
            rentEnd: '2019-11-11',
            status: 'using',
          },
        ],
      },
      {
        id: 3,
        roomName: '2-2-101',
        building: '2#',
        unit: '2单元',
        number: 1,
        remark: '房间的说明',
        records: [
          {
            id: 2,
            type: 'company',
            category: {
              type: 'company',
              title: '包商公司',
            },
            room: {
              roomName: '2-2-101',
            },
            company: {
              companyName: '青岛滴滴滴滴滴地点工程有限公司',
              manager: '张三',
              managerPhone: '13333333333',
              linkman: '李四',
              linkmanPhone: '13345673456',
              remark: '这是一个公司的备注',
            },
            person: {},
            recordAt: '2019-11-11',
            rentStart: '',
            rentEnd: '',
            status: 'using',
          },
        ],
      },
      {
        id: 4,
        roomName: '3-3-101',
        building: '3#',
        unit: '3单元',
        number: 1,
        remark: '房间的说明',
        records: [
          {
            id: 14,
            type: 'person',
            category: {
              type: 'person',
              title: '新职工',
            },
            room: {
              roomName: '3-3-101',
            },
            company: {},
            person: {
              id: 12,
              name: '张三2',
              gender: '男',
              enteredAt: '2011-8-7',
              education: '本科',
              serial: '11050487',
              identify: '1305221998080190887',
              phone: '13333333333',
              department: '资产财务部',
              contractStart: '1990-12-1',
              contractEnd: '无固定期',
              remark: '备注',
            },
            recordAt: '2019-11-11',
            rentStart: '2019-11-11',
            rentEnd: '2019-11-11',
            status: 'using',
          },
        ],
      },
      {
        id: 5,
        roomName: '4-3-101',
        building: '4#',
        unit: '3单元',
        number: 1,
        remark: '房间的说明',
        records: [
          {
            id: 14,
            type: 'functional',
            category: {
              type: 'functional',
              title: '仓库',
            },
            room: {
              roomName: '3-3-101',
            },
            company: {},
            person: {},
            recordAt: '2019-11-11',
            rentStart: '',
            rentEnd: '',
            status: 'using',
          },
        ],
      },
    ],
  },
};

export default {
  'GET /api/livings': (req: Request, res: Response) => {
    setTimeout(() => {
      res.status(200).send(livings);
    }, 1000);
  },
};
