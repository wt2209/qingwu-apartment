import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Button, Icon, Spin, Tree } from 'antd';
import { connect } from 'dva';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Person from './components/Person';
import Company from './components/Company';
import { ModelState } from './model';
import { LivingFetchParams } from '@/pages/living/livings/service';
import { removeEmpty } from '@/utils/tools';
import Functional from './components/Functional';
import { LivingListItem, BuildingTreeItem } from './data';
import { RecordListItem } from '../records/data';
import { Link } from 'umi';
import SearchBar from './components/SearchBar';

const { TreeNode, DirectoryTree } = Tree;

const buildingTree: BuildingTreeItem[] = [
  { building: '1#', units: ['1单元', '2单元'] },
  { building: '2#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '3#', units: ['1单元', '2单元', '3单元'] },
  { building: '4#', units: ['1单元', '2单元', '3单元'] },
  { building: '5#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '6#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '7#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '8#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '9#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '10#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '11#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '12#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '13#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '14#', units: ['1单元', '2单元', '3单元'] },
  { building: '红1#', units: ['1单元', '2单元'] },
  { building: '红2#', units: ['1单元', '2单元', '3单元'] },
  { building: '红3#', units: ['1单元', '2单元', '3单元', '4单元'] },
  { building: '高1#', units: ['3-8层', '9-14层', '15-17层'] },
  { building: '高2#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
  { building: '高3#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
  { building: '高4#', units: ['1-5层', '6-10层', '11-16层', '17-20层'] },
]

export interface Props extends FormComponentProps {
  dispatch: Dispatch<Action<'livings/add' | 'livings/fetch' | 'livings/remove' | 'livings/update'>>;
  loading: boolean;
  livings: ModelState;
}

export interface State {
  checkedKeys: string[];
  expandedKeys: string[];
}

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
  state: State = {
    checkedKeys: [],
    expandedKeys: [],
  };

  fetchData = (options: LivingFetchParams) => {
    const payload = removeEmpty(options);
    console.log(payload);
    this.props.dispatch({ type: 'livings/fetch', payload });
  };

  componentDidMount = () => {
    const { params } = this.props.livings;
    if (params.selectedBuilding && params.selectedUnit) {
      this.setState({
        expandedKeys: [params.selectedBuilding],
        checkedKeys: [params.selectedBuilding + '|' + params.selectedUnit]
      })
    }
  }

  onSelect = (keys: string[]) => {
    if (keys[0].indexOf('|') === -1) { // 点击的是楼号
      if (keys[0] === this.state.expandedKeys[0]) { // 折叠
        this.setState({ expandedKeys: [] })
      } else {
        this.setState({ expandedKeys: keys }) // 展开
      }
    } else { // 点击的是单元号
      const [selectedBuilding, selectedUnit] = keys[0].split('|');
      this.setState({ checkedKeys: keys });
      this.fetchData({ selectedBuilding, selectedUnit });
    }
  };

  renderContent = (living: LivingListItem) => {
    const number = Math.max(living.number, living.records.length);
    const width = number === 1 ? '99%' : '49%';
    const result = [];
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
          case 'functional':
            result.push(this.renderFunctional(record, width));
            break;
          default:
            result.push(null);
        }
      } else {
        result.push(
          <Card.Grid key={`empty${living.id}${i}`} style={{ padding: 0, margin: '0.5%', width }}>
            <Button
              type="dashed"
              style={{ border: '0', backgroundColor: '#5dade2', width: '100%', height: 225 }}
            >
              <Link to={`/living/livings/create/${living.id}`}>
                <Icon type="plus" style={{ fontSize: 30, color: 'rgba(0,0,0,0.65)' }} />
              </Link>
            </Button>
          </Card.Grid>,
        );
      }
    }
    return result;
  };

  renderCompany = (record: RecordListItem, width: string) => (
    <Card.Grid
      key={`company${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Company record={record} />
    </Card.Grid>
  );

  renderPeople = (record: RecordListItem, width: string) => (
    <Card.Grid
      key={`person${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Person record={record} />
    </Card.Grid>
  );

  renderFunctional = (record: RecordListItem, width: string) => (
    <Card.Grid
      key={`functional${record.id}`}
      style={{
        padding: 0,
        margin: '0.5%',
        width,
      }}
    >
      <Functional record={record} />
    </Card.Grid>
  );

  renderLivingTitle = (living: { roomName: string; remark: string }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', flex: 2 }}>{living.roomName}</div>
      <div style={{ fontSize: 14, flex: 4 }}>{living.remark}</div>
    </div>
  );

  render() {
    const { livings, loading } = this.props;
    const { expandedKeys, checkedKeys } = this.state;
    const {
      data: { list },
      params,
    } = livings;

    return (
      <PageHeaderWrapper title={false}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 168, marginRight: 16 }} >
            <Card bodyStyle={{ padding: 16 }}>
              <Spin spinning={loading || false}>
                <DirectoryTree expandedKeys={expandedKeys} checkedKeys={checkedKeys} onSelect={this.onSelect}>
                  {buildingTree.map(item =>
                    <TreeNode title={item.building} key={item.building}>
                      {item.units.map(unit => <TreeNode title={unit} key={item.building + "|" + unit} isLeaf />)}
                    </TreeNode>
                  )}
                </DirectoryTree >
              </Spin>
            </Card>
          </div>
          <div style={{ flex: 1 }}>
            <Spin spinning={loading || false}>
              <Card style={{ marginBottom: 20 }}>
                <SearchBar fetchData={this.fetchData} params={params} />
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
          </div>
        </div>
      </PageHeaderWrapper >
    );
  }
}

export default Living;
