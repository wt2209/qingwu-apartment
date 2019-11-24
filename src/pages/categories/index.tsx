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

export interface CategoryColumnProps {
  title: string;
  dataIndex: string;
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
    const { dispatch } = this.props;
    dispatch({ type: 'categories/fetch', payload: { aaa: 'aaa' } });
  };
  handleCreateModalVisible = (flag: boolean) => {
    this.setState({
      createModelVisible: flag,
    });
  };
  handleAdd = (values: {}) => {
    console.log(values);
  };
  render() {
    const {
      categories: { data },
      loading,
    } = this.props;
    const { list, pagination } = data;

    const columns: CategoryColumnProps[] = [
      {
        title: '名称',
        dataIndex: 'title',
      },
      {
        title: '水电费类型',
        dataIndex: 'utilityType',
      },
      {
        title: '说明',
        dataIndex: 'description',
      },
    ];
    return (
      <PageHeaderWrapper>
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
            <Table columns={columns} dataSource={list} loading={loading} />
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
