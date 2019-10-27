import { Button, Card, Divider, Form, message, Table } from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import { StandardTableColumnProps } from './components/StandardTable';
import UpdateForm, { FormValueType } from './components/UpdateForm';

import styles from './style.less';
import { CategoryModelState, Category } from '@/models/category';

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<'category/add' | 'category/fetch' | 'category/remove' | 'category/update'>
  >;
  loading: boolean;
  category: CategoryModelState;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  formValues: { [key: string]: string };
  stepFormValues: Partial<Category>;
}

/* eslint react/no-multi-comp:0 */
@connect(
  ({
    category,
    loading,
  }: {
    category: CategoryModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    category,
    loading: loading.models.category,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    formValues: {},
    stepFormValues: {},
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '类型名称',
      dataIndex: 'title',
    },
    {
      title: '居住类型',
      dataIndex: 'type',
      render(val: 'person' | 'company') {
        return val === 'person' ? '人员入住' : '公司或机构入住';
      },
    },
    {
      title: '水电费收费',
      dataIndex: 'utilityRule',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/fetch',
    });
  }

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag?: boolean, record?: Category) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = (fields: { desc: any }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = (fields: FormValueType) => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'category/update',
    //   payload: {
    //     name: fields.name,
    //     desc: fields.desc,
    //     key: fields.key,
    //   },
    // });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  render() {
    const {
      category: { data },
      loading,
    } = this.props;

    const { list, pagination } = data;

    const paginationProps = pagination
      ? {
          showSizeChanger: false,
          showQuickJumper: false,
          ...pagination,
        }
      : false;

    const { modalVisible, updateModalVisible, stepFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                添加
              </Button>
            </div>
            <div className={styles.standardTable}>
              <Table
                rowKey={'id'}
                dataSource={list}
                pagination={paginationProps}
                loading={loading}
                columns={this.columns}
              />
            </div>
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          //@ts-ignore
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
