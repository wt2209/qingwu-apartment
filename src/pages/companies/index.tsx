import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Button, Form, Row, Col, Input, Divider } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { ModelState } from './model';
import { connect } from 'dva';
import styles from '../../styles/index.less';
import { removeEmpty } from '@/utils/tools';
import { CompanyFetchParams } from '@/services/company';

const FormItem = Form.Item;

export interface State {
  params: CompanyFetchParams;
}

export interface Props extends FormComponentProps {
  dispatch: Dispatch<
    Action<'companies/add' | 'companies/fetch' | 'companies/remove' | 'companies/update'>
  >;
  loading: boolean;
  companies: ModelState;
}

@connect(
  ({
    companies,
    loading,
  }: {
    companies: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    companies,
    loading: loading.models.companies,
  }),
)
class Company extends React.Component<Props, State> {
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
  fetchData = (params: CompanyFetchParams) => {
    const payload = removeEmpty(params);
    this.props.dispatch({ type: 'companies/fetch', payload });
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="公司名">
              {getFieldDecorator('companyName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="负责人">
              {getFieldDecorator('manager')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="联系人">
              {getFieldDecorator('linkman')(<Input placeholder="请输入" />)}
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
      companies: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns = [
      {
        title: '公司名称',
        dataIndex: 'companyName',
      },
      {
        title: '负责人',
        dataIndex: 'manager',
      },
      {
        title: '负责人电话',
        dataIndex: 'managerPhone',
      },
      {
        title: '日常联系人',
        dataIndex: 'linkman',
      },
      {
        title: '联系人电话',
        dataIndex: 'linkmanPhone',
      },
      {
        title: '进驻公寓时间',
        dataIndex: 'enteredAt',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        width: 80,
        render: (text, record) => (
          <Fragment>
            <Divider type="vertical" />
            <a href="">删除</a>
          </Fragment>
        ),
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

export default Form.create<Props>()(Company);
