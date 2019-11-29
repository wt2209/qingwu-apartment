import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { ModelState } from './model';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';

export interface State {
  createModelVisible: boolean;
  updateModelVisible: boolean;
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
    createModelVisible: false,
    updateModelVisible: false,
  };
  componentDidMount = () => {
    const payload = { current: 1, pageSize: 20 };
    this.fetchData(payload);
  };
  handleCreateModalVisible = (flag: boolean) => {
    this.setState({
      createModelVisible: flag,
    });
  };
  handleAdd = (values: {}) => {
    console.log(values);
  };
  handlePaginationChange = (current: number, pageSize: number = 20) => {
    const payload = { current, pageSize };
    this.fetchData(payload);
  };
  fetchData = (payload: { current: number; pageSize: number }) => {
    const { dispatch } = this.props;
    dispatch({ type: 'rooms/fetch', payload });
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
        title: '备注',
        dataIndex: 'remark',
      },
    ];
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.handleCreateModalVisible(true)}
              >
                新建
              </Button>
            </div>
            <Table
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

export default Room;
