import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { CategoryModelState } from './model';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';

export interface CategoryState {
  createModelVisible: boolean;
  updateModelVisible: boolean;
}

export interface CategoryProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<'categories/add' | 'categories/fetch' | 'categories/remove' | 'categories/update'>
  >;
  loading: boolean;
  categories: CategoryModelState;
}

@connect(
  ({
    categories,
    loading,
  }: {
    categories: CategoryModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    categories,
    loading: loading.models.categories,
  }),
)
class Category extends React.Component<CategoryProps, CategoryState> {
  state: CategoryState = {
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
    dispatch({ type: 'categories/fetch', payload });
  };
  render() {
    const {
      categories: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns = [
      {
        title: '名称',
        dataIndex: 'title',
      },
      {
        title: '属于',
        dataIndex: 'type',
        render: (text: string) => (text === 'person' ? '个人居住' : '公司或机构入住'),
      },
      {
        title: '水电费收费',
        dataIndex: 'utilityType',
      },
      {
        title: '说明',
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
              rowKey="id"
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

export default Category;
