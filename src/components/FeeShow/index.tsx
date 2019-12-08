import React, { Fragment } from 'react';
import { Table } from 'antd';

interface Props {
  fees: {
    [key: string]: number[];
  };
}

interface State {}

class FeeShow extends React.Component<Props, State> {
  generateColumns = () => {
    // 第一列
    let columns = [];
    columns.push({
      title: '年度',
      dataIndex: 'year',
    });

    const headTitle: { title: string; children: any[] } = {
      title: '月度费用（元/月）',
      children: [],
    };
    // 费用列
    Object.keys(this.props.fees).forEach(type => {
      headTitle.children.push({
        title: type,
        dataIndex: type,
      });
    });
    columns.push(headTitle);
    return columns;
  };

  generateData = () => {
    const { fees } = this.props;
    const length = Object.values(fees)[0].length;
    let data = [];

    for (let i = 1; i < length; i++) {
      let o = { year: '第' + i + '年' };
      Object.keys(fees).forEach(key => {
        o[key] = fees[key][i];
      });
      data.push(o);
    }

    // 将 "其他年限" 放在最后
    let last = { year: length > 0 ? '其他年' : '所有年' };
    Object.keys(fees).forEach(key => {
      last[key] = fees[key][0] || '不收费';
    });
    data.push(last);

    return data;
  };

  render() {
    const columns = this.generateColumns();
    const data = this.generateData();

    return (
      <Fragment>
        <Table
          bordered={true}
          size="small"
          rowKey="year"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Fragment>
    );
  }
}

export default FeeShow;
