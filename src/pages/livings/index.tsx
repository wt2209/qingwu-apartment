import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Icon, Divider } from 'antd';
import Person from './components/Person';
import Company from './components/Company';
import { LivingListItem, RoomListItem } from '@/dataTypes/listItem';
import SelectBuilding from './components/SelectBuilding';
import SearchBar from './components/SearchBar';

const livings: LivingListItem[] = [
  {
    id: 1,
    category: {
      type: 'company',
      title: '包商公司',
    },
    roomName: '1-1-102',
    building: '1#',
    unit: '1单元',
    number: 4,
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
        status: 'living',
      },
    ],
  },
  {
    id: 2,
    category: {
      type: 'person',
      title: '新职工',
    },
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
        status: 'living',
      },
      {
        id: 4,
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
        rentStart: '',
        rentEnd: '',
        status: 'living',
      },
    ],
  },
  {
    id: 3,
    category: {
      type: 'company',
      title: '包商公司',
    },
    roomName: '2-2-101',
    building: '2#',
    unit: '2单元',
    number: 4,
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
        status: 'living',
      },
    ],
  },
  {
    id: 4,
    category: {
      type: 'person',
      title: '租赁',
    },
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
        rentStart: '',
        rentEnd: '',
        status: 'living',
      },
    ],
  },
];

class Living extends React.Component {
  renderContent = (living: LivingListItem) => {
    switch (living.category.type) {
      case 'person':
        return this.renderPeople(living);
      case 'company':
        return this.renderCompany(living);
      default:
        return null;
    }
  };
  renderCompany = (living: LivingListItem) => {
    if (Object.keys(living.records).length > 0) {
      const record = living.records[0];
      return (
        <Card.Grid
          style={{
            padding: 0,
            margin: '0.5%',
            width: '99%',
          }}
        >
          <Company record={record} />
        </Card.Grid>
      );
    } else {
      return (
        <Card.Grid style={{ padding: 0, margin: '0.5%', width: '99%' }}>
          <Button
            type="dashed"
            style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
          >
            <Icon type="plus" style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
          </Button>
        </Card.Grid>
      );
    }
  };
  renderPeople = (living: LivingListItem) => {
    const number = Math.max(living.number, living.records.length);
    const result = [];
    const width = number === 1 ? '99%' : '49%';
    for (let i = 0; i < number; i++) {
      const record = living.records[i];
      if (record) {
        result.push(
          <Card.Grid
            style={{
              padding: 0,
              margin: '0.5%',
              width,
            }}
          >
            <Person record={record} />
          </Card.Grid>,
        );
      } else {
        result.push(
          <Card.Grid style={{ padding: 0, margin: '0.5%', width }}>
            <Button
              type="dashed"
              style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
            >
              <Icon type="plus" style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
            </Button>
          </Card.Grid>,
        );
      }
    }
    return result;
  };
  renderLivingTitle = (living: RoomListItem) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>
          {living.roomName}
          <span style={{ fontSize: 14 }}>（{living.category.title}）</span>
        </div>
        <div style={{ fontSize: 14, flex: 4 }}>{living.remark}</div>
      </div>
    );
  };
  render() {
    return (
      <PageHeaderWrapper title={false}>
        <Card style={{ marginBottom: 20 }}>
          <SelectBuilding />
          <Divider dashed style={{ margin: '6px 0' }} />
          <SearchBar />
        </Card>
        <Row gutter={24}>
          {livings.map(living => (
            <Col span={12}>
              <Card
                style={{ marginBottom: 24 }}
                headStyle={{ padding: '0 12px' }}
                bodyStyle={{ padding: '0.5%' }}
                title={this.renderLivingTitle(living)}
                actions={[
                  <Icon type="setting" key="setting" />,
                  <Icon type="edit" key="edit" />,
                  <Icon type="ellipsis" key="ellipsis" />,
                ]}
              >
                {this.renderContent(living)}
              </Card>
            </Col>
          ))}
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Living;
