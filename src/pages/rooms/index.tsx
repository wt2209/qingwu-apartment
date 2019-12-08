import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Divider, Form, Row, Col, Input, message, Badge } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { ModelState } from './model';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import styles from '../../styles/index.less';
import { RoomListItem } from '@/dataTypes/listItem';
import { RoomFetchParams, RoomStoreData } from '@/services/room';
import { removeEmpty } from '@/utils/tools';

const FormItem = Form.Item;

export interface State {
  createModelVisible: boolean;
  updateModelVisible: boolean;
  params: RoomFetchParams;
}

export interface Props extends FormComponentProps {
  dispatch: Dispatch<Action<'rooms/add' | 'rooms/fetch' | 'rooms/remove' | 'rooms/update'>>;
  loading: boolean;
  rooms: ModelState;
}

@connect(
  ({
    rooms,
    loading,
  }: {
    rooms: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    rooms,
    loading: loading.models.rooms,
  }),
)
class Room extends React.Component<Props, State> {
  state: State = {
    params: { current: 1, pageSize: 20 },
    createModelVisible: false,
    updateModelVisible: false,
  };
  componentDidMount = () => {
    this.fetchData(this.state.params);
  };
  handleCreateModalVisible = (flag: boolean) => {
    this.setState({
      createModelVisible: flag,
    });
  };
  handleAdd = (payload: Partial<RoomStoreData>) => {
    this.props.dispatch({
      type: 'rooms/add',
      payload,
      callback: (status: 'ok' | 'error') => {
        status === 'ok' ? message.success('添加成功') : message.error('添加失败');
      },
    });
    this.handleCreateModalVisible(false);
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

  // 控制此类型是否在居住首页楼号选择中显示
  handleChangeStatus = (status: 'show' | 'hide', id: number) => {
    console.log(id);
  };

  fetchData = (params: RoomFetchParams) => {
    const payload = removeEmpty(params);
    this.props.dispatch({ type: 'rooms/fetch', payload });
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="房间号">
              {getFieldDecorator('roomName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="楼号">
              {getFieldDecorator('building')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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
      rooms: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns = [
      {
        title: '房间号',
        dataIndex: 'roomName',
      },
      {
        title: '楼号',
        dataIndex: 'building',
      },
      {
        title: '单元/楼层',
        dataIndex: 'unit',
      },
      {
        title: '定员人数',
        dataIndex: 'number',
      },
      {
        title: '默认租金',
        dataIndex: 'rent',
        render: (rent: number) => (rent ? rent : null),
      },
      {
        title: '在居住页显示',
        dataIndex: 'status',
        render: (text: 'show' | 'hide') => {
          return text === 'hide' ? (
            <Badge status="error" text="已隐藏" />
          ) : (
            <Badge status="success" text="已显示" />
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text: string, record: RoomListItem) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
            <Divider type="vertical" />
            {record.status === 'hide' && (
              <a onClick={() => this.handleChangeStatus('show', record.id)}>显示</a>
            )}
            {(!record.status || record.status === 'show') && (
              <a onClick={() => this.handleChangeStatus('hide', record.id)}>隐藏</a>
            )}
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
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleCreateModalVisible(true)}
              >
                新建
              </Button>
              <Button icon="download" onClick={() => this.handleCreateModalVisible(true)}>
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
        <CreateForm
          handleAdd={this.handleAdd}
          handleModelVisible={this.handleCreateModalVisible}
          modelVisible={this.state.createModelVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<Props>()(Room);
