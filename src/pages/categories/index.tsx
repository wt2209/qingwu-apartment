import React, { Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Divider, Badge, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Dispatch, Action } from 'redux';
import { connect } from 'dva';
import { CategoryModelState } from './model';
import styles from '../../styles/index.less';
import { removeEmpty } from '@/utils/tools';
import { CategoryFetchParams, CategoryStoreData } from '@/services/category';
import FeeShow from '@/components/FeeShow';
import { CategoryTypeMapper } from '@/mappers';
import { CategoryListItem } from './data';
import CreateOrUpdateForm, { FormValueType } from './components/CreateOrUpdateForm';

export interface CategoryState {
  params: CategoryFetchParams;
  modalVisible: boolean;
  currentItem: FormValueType;
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
    modalVisible: false,
    currentItem: {
      id: 0,
      title: '',
      type: 'person',
      utilityType: '',
      chargeRules: {},
      remark: '',
    },
  };

  componentDidMount = () => {
    this.fetchData(this.state.params);
  };

  handleAdd = () => {
    this.setState({
      modalVisible: true,
      currentItem: {
        id: 0,
        title: '',
        type: 'person',
        utilityType: '',
        chargeRules: {},
        remark: '',
      },
    });
  };

  handleEdit = (record: FormValueType) => {
    this.setState({
      modalVisible: true,
      currentItem: record,
    });
  };

  handleModalHide = () => {
    this.setState({ modalVisible: false });
  };

  handleSubmit = (payload: CategoryStoreData) => {
    this.setState({ modalVisible: false });
    const type = payload.id > 0 ? 'categories/update' : 'categories/add';
    this.props.dispatch({
      type,
      payload,
      callback: (status: 'ok' | 'error') => {
        status === 'ok' ? message.success('操作成功') : message.error('操作失败');
      },
    });
  };

  handlePaginationChange = (current: number, pageSize: number = 20) => {
    const payload = { current, pageSize };
    this.fetchData(payload);
  };

  // 控制此类型是否在居住首页楼号选择中显示
  handleChangeStatus = (status: 'show' | 'hide', id: number) => {
    console.log(id);
  };

  handleExport = () => {
    console.log('export');
  };

  expandedRowRender = (record: CategoryListItem) => (Object.values(record.chargeRules).length > 0 ? (
      <FeeShow fees={record.chargeRules} />
    ) : (
      '不收费'
    ));

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
        render: (text: string) => CategoryTypeMapper[text],
      },
      {
        title: '水电费收费',
        dataIndex: 'utilityType',
      },
      {
        title: '在居住页显示',
        dataIndex: 'status',
        render: (text: 'show' | 'hide') => (text === 'hide' ? (
            <Badge status="error" text="已隐藏" />
          ) : (
            <Badge status="success" text="已显示" />
          )),
      },
      {
        title: '说明',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text: string, record: CategoryListItem) => (
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
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>
                新建
              </Button>
              <Button icon="download" onClick={() => this.handleExport()}>
                导出
              </Button>
            </div>
            <Table
              rowKey="id"
              expandedRowRender={this.expandedRowRender}
              pagination={{ ...pagination, onChange: this.handlePaginationChange }}
              columns={columns}
              dataSource={list}
              loading={loading}
            />
          </div>
        </Card>
        <CreateOrUpdateForm
          defaultValues={this.state.currentItem}
          handleSubmit={this.handleSubmit}
          handleModalHide={this.handleModalHide}
          modelVisible={this.state.modalVisible}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Category;
