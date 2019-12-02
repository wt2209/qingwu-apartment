import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Divider } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { CategoryModelState } from './model';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import styles from '../../styles/index.less';
import { removeEmpty } from '@/utils/tools';
import { CategoryFetchParams } from '@/services/category';

export interface CategoryState {
  params: CategoryFetchParams;
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
  handleAdd = (values: {}) => {
    console.log(values);
  };
  handlePaginationChange = (current: number, pageSize: number = 20) => {
    const payload = { current, pageSize };
    this.fetchData(payload);
  };
  fetchData = (params: CategoryFetchParams) => {
    const payload = removeEmpty(params);
    this.props.dispatch({ type: 'categories/fetch', payload });
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
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改</a>
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

export default Category;
