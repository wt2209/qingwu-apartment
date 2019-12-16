import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Form, Row, Col, Input, Select, DatePicker } from 'antd';
import styles from '../../../styles/index.less';
import { connect } from 'dva';
import { ModelState } from './model';
import { Dispatch, Action } from 'redux';
import { BillFetchParams } from './service';
import { FormComponentProps } from 'antd/es/form';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props extends FormComponentProps {
  dispatch: Dispatch<
    Action<'bills/add'> | Action<'bills/fetch'> | Action<'bills/remove'> | Action<'bills/update'>
  >;
  loading: boolean;
  bills: ModelState;
}

interface State {
  params: BillFetchParams;
}

@connect(
  ({
    bills,
    loading,
  }: {
    bills: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    bills,
    loading: loading.models.bills,
  }),
)
class Bills extends React.Component<Props, State> {
  state: State = {
    params: { current: 1, pageSize: 20 },
  };

  componentDidMount = () => {
    this.fetchData(this.state.params);
  };

  handleAdd = () => {
    console.log('add');
  };

  handleExport = () => {
    console.log('export');
  };

  handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const params = {
        ...this.state.params,
        ...values,
      };
      this.setState({ params });

      this.fetchData(params);
    });
  };

  handleFormReset = () => {
    const { current, pageSize } = this.state.params;
    const params = { current, pageSize };
    this.props.form.resetFields();
    this.setState({ params });
    this.fetchData(params);
  };

  handlePaginationChange = (current: number, pageSize: number = 20) => {
    const payload = { current, pageSize };
    this.fetchData(payload);
  };

  fetchData = (params: BillFetchParams) => {
    const payload = params;
    this.props.dispatch({ type: 'bills/fetch', payload });
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="房间号 / 位置" labelCol={{ span: 4 }}>
              {getFieldDecorator('roomName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="住户姓名" labelCol={{ span: 4 }}>
              {getFieldDecorator('serial')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="费用类型" labelCol={{ span: 4 }}>
              {getFieldDecorator('status')(
                <Select placeholder="请选择" allowClear={true} style={{ width: '100%' }}>
                  <Option value="0">租赁房租</Option>
                  <Option value="1">单身床位费</Option>
                  <Option value="2">租赁电费</Option>
                  <Option value="3">租赁水费</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: 12 }}>
          <Col md={7} sm={24}>
            <FormItem label="费用生成时间" labelCol={{ span: 4 }}>
              {getFieldDecorator('createdAt')(<RangePicker format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="缴费时间" labelCol={{ span: 4 }}>
              {getFieldDecorator('chargedAt')(<RangePicker format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      bills: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns = [
      {
        title: '房间号/位置',
        dataIndex: 'roomName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '费用类型',
        dataIndex: 'type',
      },
      {
        title: '金额',
        dataIndex: 'money',
      },
      {
        title: '费用说明',
        dataIndex: 'description',
      },
      {
        title: '生成时间',
        dataIndex: 'createdAt',
      },
      {
        title: '缴费时间',
        dataIndex: 'chargedAt',
      },
    ];
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false} style={{ marginBottom: 20 }}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.tableListHeader}>
            <div className={styles.tableListTitle}>费用明细</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                新建
              </Button>
              <Button icon="download" onClick={() => this.handleExport()}>
                导出
              </Button>
            </div>
          </div>
          <Table
            rowKey="id"
            pagination={{ ...pagination, onChange: this.handlePaginationChange }}
            columns={columns}
            dataSource={list}
            loading={loading}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<Props>()(Bills);
