import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Icon, Spin } from 'antd';
import Person from './components/Person';
import Company from './components/Company';
import { LivingListItem, RecordListItem } from '@/dataTypes/listItem';
import SelectTags from './components/SelectAndSearch';
import { connect } from 'dva';
import { ModelState } from './model';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { LivingFetchParams } from '@/services/living';
import { removeEmpty } from '@/utils/tools';

export interface Props extends FormComponentProps {
  dispatch: Dispatch<Action<'livings/add' | 'livings/fetch' | 'livings/remove' | 'livings/update'>>;
  loading: boolean;
  livings: ModelState;
}

export interface State {}

@connect(
  ({
    livings,
    loading,
  }: {
    livings: ModelState;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    livings,
    loading: loading.models.livings,
  }),
)
class Living extends React.Component<Props, State> {
  fetchData = (options: LivingFetchParams) => {
    const payload = removeEmpty(options);
    console.log(payload);
    this.props.dispatch({ type: 'livings/fetch', payload });
  };

  renderContent = (living: LivingListItem) => {
    const number = Math.max(living.number, living.records.length);
    const width = number === 1 ? '99%' : '49%';
    let result = [];
    for (let i = 0; i < number; i++) {
      const record = living.records[i];
      if (record) {
        switch (record.type) {
          case 'person':
            result.push(this.renderPeople(record, width));
            break;
          case 'company':
            result.push(this.renderCompany(record, width));
            break;
          default:
            result.push(null);
        }
      } else {
        result.push(
          <Card.Grid key={'empty' + living.id + i} style={{ padding: 0, margin: '0.5%', width }}>
            <Button
              type="dashed"
              style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
            >
              <Icon type="plus" style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
            </Button>
          </Card.Grid>,
        );
      }
    }
    return result;
  };

  renderCompany = (record: RecordListItem, width: string) => {
    return (
      <Card.Grid
        key={'company' + record.id}
        style={{
          padding: 0,
          margin: '0.5%',
          width,
        }}
      >
        <Company record={record} />
      </Card.Grid>
    );
  };

  renderPeople = (record: RecordListItem, width: string) => {
    return (
      <Card.Grid
        key={'person' + record.id}
        style={{
          padding: 0,
          margin: '0.5%',
          width,
        }}
      >
        <Person record={record} />
      </Card.Grid>
    );
  };

  renderLivingTitle = (living: { roomName: string; remark: string }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>{living.roomName}</div>
        <div style={{ fontSize: 14, flex: 4 }}>{living.remark}</div>
      </div>
    );
  };

  render() {
    const { livings, loading } = this.props;
    const {
      data: { list },
      params,
    } = livings;

    return (
      <PageHeaderWrapper title={false}>
        <Spin spinning={loading || false}>
          <Card style={{ marginBottom: 20 }}>
            <SelectTags fetchData={this.fetchData} params={params} />
          </Card>
        </Spin>
        <Row gutter={24}>
          {list.map(living => (
            <Col span={12} key={living.id}>
              <Card
                style={{ marginBottom: 24 }}
                headStyle={{ padding: '0 12px' }}
                bodyStyle={{ padding: '0.5%' }}
                title={this.renderLivingTitle(living)}
                actions={[
                  <Icon type="setting" key="setting" />,
                  <Icon type="edit" key="edit" />,
                  <Icon type="ellipsis" key="ellipsis" />,
                ]}
              >
                {this.renderContent(living)}
              </Card>
            </Col>
          ))}
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Living;
