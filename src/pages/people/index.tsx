import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Form, Row, Col, Input, Divider } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { ModelState } from './model';
import { connect } from 'dva';
import styles from '../../styles/index.less';
import { PersonFetchParams } from '@/services/person';
import { removeEmpty } from '@/utils/tools';

const FormItem = Form.Item;

export interface State {
  params: PersonFetchParams;
}

export interface Props extends FormComponentProps {
  dispatch: Dispatch<Action<'people/add' | 'people/fetch' | 'people/remove' | 'people/update'>>;
  loading: boolean;
  people: ModelState;
}

@connect(
  ({
    people,
    loading,
  }: {
    people: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    people,
    loading: loading.models.people,
  }),
)
class Room extends React.Component<Props, State> {
  state: State = {
    params: {
      current: 1,
      pageSize: 20,
    },
  };
  componentDidMount = () => {
    this.fetchData(this.state.params);
  };
  handleAdd = (values: {}) => {
    console.log(values);
  };
  handlePaginationChange = (current: number) => {
    const payload = { ...this.state.params, current };
    this.fetchData(payload);
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
  fetchData = (params: PersonFetchParams) => {
    const payload = removeEmpty(params);
    this.props.dispatch({ type: 'people/fetch', payload });
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="工号">
              {getFieldDecorator('serial')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="身份证号">
              {getFieldDecorator('identify')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="部门">
              {getFieldDecorator('department')(<Input placeholder="请输入" />)}
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
      people: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      },
      {
        title: '学历',
        dataIndex: 'education',
      },
      {
        title: '工号',
        dataIndex: 'serial',
      },
      {
        title: '身份证号',
        dataIndex: 'identify',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '部门',
        dataIndex: 'department',
      },
      {
        title: '入职时间',
        dataIndex: 'hiredAt',
      },
      {
        title: '入住公寓时间',
        dataIndex: 'enteredAt',
      },
      {
        title: '劳动合同起始日',
        dataIndex: 'contractStart',
      },
      {
        title: '劳动合同结束日',
        dataIndex: 'contractEnd',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
    ];
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="download" onClick={this.handleExport}>
                导出
              </Button>
            </div>
            <Table
              rowKey="id"
              pagination={{ ...pagination, onChange: this.handlePaginationChange }}
              columns={columns}
              dataSource={list}
              loading={loading}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<Props>()(Room);
