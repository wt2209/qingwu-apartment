import React, { Fragment } from 'react';
import { Table, Input, Button, Form, Alert, Result } from 'antd';
import { FormComponentProps } from 'antd/es/form';

interface Props extends FormComponentProps {
  fees: {
    [key: string]: number[];
  };
}

interface State {
  error: string;
  totalYear: number;
  fees: {
    [key: string]: number[];
  };
}

class FeeSetting extends React.Component<Props, State> {
  state: State = {
    error: '',
    totalYear: 0, // 需要精确设置的年数。如：第1年，第2年，其他年：则 totalYear=2
    fees: {
      // 房租: [1000, 700, 800, 900],
    },
  };
  componentDidMount = () => {
    const { fees } = this.props;

    this.setState({
      fees,
      totalYear: Object.values(fees)[0] ? Object.values(fees)[0].length - 1 : 0,
    });
  };
  deleteYear = (e: any) => {
    e.preventDefault();
    this.setState({ totalYear: this.state.totalYear - 1 });
  };
  deleteType = (e: any, key: string) => {
    e.preventDefault();
    const fees = this.state.fees;
    delete fees[key];
    this.setState({ fees });
  };
  addType = () => {
    const fees = this.state.fees;
    fees['费用类型' + (Object.keys(fees).length + 1)] = new Array(this.state.totalYear);
    this.setState({ fees });
  };
  addYear = () => {
    this.setState({
      totalYear: this.state.totalYear + 1,
    });
  };

  submit = (callback: any) => {
    this.props.form.validateFields((err, formValues) => {
      if (err) {
        this.setState({ error: '所有输入框必须填写' });
        return;
      }
      this.setState({ error: '' });
      const { titles, values } = formValues;

      let result = {};
      values &&
        values.forEach((fees: number[], year: number) => {
          fees.forEach((fee: number, index: number) => {
            const type = titles[index];
            if (!result[type]) {
              result[type] = [];
            }
            result[type][year] = fee;
          });
        });

      if (callback) {
        callback(result);
      }
    });
  };

  generateColumns = () => {
    const { getFieldDecorator } = this.props.form;
    // 第一列
    let columns = [];
    columns.push({
      title: '',
      width: 80,
      dataIndex: 'year',
    });
    // 费用列
    Object.keys(this.state.fees).forEach((type, index) => {
      columns.push({
        title: getFieldDecorator('titles[' + index + ']', {
          initialValue: type,
          rules: [{ required: true, message: '必须填写' }],
        })(<Input key={type} />),
        dataIndex: type,
      });
    });
    // 操作列
    columns.push({
      title: '',
      render: (text: Object, _: Object, index: number) => {
        if (index === this.state.totalYear - 1) {
          return (
            <Button style={{ padding: 0 }} type="link" onClick={e => this.deleteYear(e)}>
              删除
            </Button>
          );
        }
        return null;
      },
    });
    return columns;
  };

  generateData = () => {
    const { getFieldDecorator } = this.props.form;
    const { fees } = this.state;
    let data = [];

    for (let i = 1; i <= this.state.totalYear; i++) {
      let o = { year: '第' + i + '年' };
      Object.keys(fees).forEach((key, index) => {
        o[key] = getFieldDecorator('values[' + i + '][' + index + ']', {
          initialValue: fees[key][i],
          rules: [{ required: true, message: '必须填写' }],
        })(<Input style={{ maxWidth: 187 }} />);
      });
      data.push(o);
    }

    // 将 "其他年限" 放在最后
    let last = { year: this.state.totalYear > 0 ? '其他年' : '所有年' };
    Object.keys(fees).forEach((key, index) => {
      last[key] = getFieldDecorator('values[0][' + index + ']', {
        initialValue: fees[key][0],
        rules: [{ required: true, message: '必须填写' }],
      })(<Input placeholder="每月费用" style={{ maxWidth: 187 }} />);
    });
    data.push(last);

    // 删除费用的行
    const columnDelete = { year: '' };
    Object.keys(fees).forEach(key => {
      columnDelete[key] = (
        <Button type="link" onClick={e => this.deleteType(e, key)}>
          删除此费用
        </Button>
      );
    });
    data.push(columnDelete);
    return data;
  };

  render() {
    const columns = this.generateColumns();
    const data = this.generateData();

    return (
      <Fragment>
        {this.state.error && (
          <Alert message={this.state.error} style={{ marginBottom: 20 }} type="error" showIcon />
        )}
        {Object.keys(this.state.fees).length === 0 ? (
          <Result
            icon={<span></span>}
            title="不设置收费规则"
            subTitle={
              <div>
                "若想为此类型设置收费规则，请点击 “添加一种费用” 按钮
                <br />
                若想为不同年限设置不同的月度费用，请点击 “添加年份” 按钮
              </div>
            }
          />
        ) : (
          <Table
            size="small"
            rowKey="year"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        )}
        <div style={{ marginTop: 20 }}>
          <Button
            icon="plus"
            onClick={this.addYear}
            type="dashed"
            style={{ width: '49%', marginRight: '1%' }}
          >
            添加年份
          </Button>
          <Button
            icon="plus"
            type="dashed"
            style={{ width: '49%', marginLeft: '1%' }}
            onClick={this.addType}
          >
            添加一种费用
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default Form.create<Props>()(FeeSetting);
