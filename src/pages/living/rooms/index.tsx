import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Divider, Form, Row, Col, Input, message, Badge } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';
import { ModelState } from './model';
import CreateOrUpdateForm from './components/CreateOrUpdateForm';
import styles from '../../../styles/index.less';
import { RoomFetchParams } from '@/pages/living/rooms/service';
import { removeEmpty } from '@/utils/tools';
import { RoomListItem, RoomFormValueType } from './data';

const FormItem = Form.Item;

export interface State {
  modalVisible: boolean;
  params: RoomFetchParams;
  currentRoom: RoomFormValueType;
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
    modalVisible: false,
    currentRoom: {
      id: 0,
      roomName: '',
      building: '',
      unit: '',
      number: undefined,
      rent: undefined,
      remark: '',
    },
  };

  componentDidMount = () => {
    this.fetchData(this.state.params);
  };

  handleModalVisible = (flag: boolean) => {
    this.setState({ modalVisible: flag });
  };

  handleAdd = () => {
    this.setState({
      currentRoom: {
        id: 0,
        roomName: '',
        building: '',
        unit: '',
        number: undefined,
        rent: undefined,
        remark: '',
      },
      modalVisible: true,
    });
  };

  handleEdit = (record: RoomFormValueType) => {
    this.setState({
      currentRoom: record,
      modalVisible: true,
    });
  };

  handleSubmit = (payload: RoomFormValueType) => {
    const type = payload.id > 0 ? 'rooms/update' : 'rooms/add';
    this.props.dispatch({
      type,
      payload,
      callback: (status: 'ok' | 'error') => {
        status === 'ok' ? message.success('操作成功') : message.error('操作失败');
      },
    });
    this.setState({
      modalVisible: false,
    });
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
        render: (rent: number) => rent || null,
      },
      {
        title: '在居住页显示',
        dataIndex: 'status',
        render: (text: 'show' | 'hide') =>
          text === 'hide' ? (
            <Badge status="error" text="已隐藏" />
          ) : (
            <Badge status="success" text="已显示" />
          ),
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text: string, record: RoomListItem) => (
          <Fragment>
            <a onClick={() => this.handleEdit(record)}>修改</a>
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
        <Card bordered={false} style={{ marginBottom: 20 }}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </Card>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.tableListHeader}>
            <div className={styles.tableListTitle}>房间明细</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                新建
              </Button>
              <Button icon="download" onClick={() => this.handleModalVisible(true)}>
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

        <CreateOrUpdateForm
          defaultValue={this.state.currentRoom}
          handleSubmit={this.handleSubmit}
          handleModalVisible={this.handleModalVisible}
          modelVisible={this.state.modalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<Props>()(Room);
