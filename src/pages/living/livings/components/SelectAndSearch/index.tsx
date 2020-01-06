import React, { Fragment } from 'react';
import { Tag, Divider, Input } from 'antd';
import { LivingFetchParams } from '@/pages/living/livings/service';
import { BuildingTreeItem } from '../../data';

const { Search } = Input;
const { CheckableTag } = Tag;

export interface SelectAndSearchState {
  buildings: string[];
  units: string[];
  selectedBuilding: string;
  selectedUnit: string;
  keyword: string;
}

interface SelectAndSearchProps {
  buildingTree: BuildingTreeItem[];
  params: LivingFetchParams;
  fetchData: (options: LivingFetchParams) => void;
}

class SelectAndSearch extends React.Component<SelectAndSearchProps, SelectAndSearchState> {
  state: SelectAndSearchState = {
    buildings: [],
    units: [],
    selectedBuilding: '',
    selectedUnit: '',
    keyword: '',
  };

  componentDidMount = () => {
    const { params, buildingTree } = this.props;
    const buildings = buildingTree.map(item => item.building);
    let units: string[] = [];
    if (params.selectedBuilding) {
      const current = this.props.buildingTree.find(item => item.building === params.selectedBuilding);
      units = current ? current.units : []
    }
    this.setState({
      buildings,
      units,
      selectedBuilding: params.selectedBuilding || '',
      selectedUnit: params.selectedUnit || '',
      keyword: params.keyword || '',
    });
  };

  componentDidUpdate = (prevProps: SelectAndSearchProps) => {
    const { params } = this.props;
    const shouldUpdate = Object.keys(params).some(key => params[key] !== prevProps.params[key]);
    if (shouldUpdate) {
      this.setState({
        ...this.state,
        ...this.props.params,
      });
    }
  };

  handleBuildingChange = (building: string, checked: boolean) => {
    const next = checked ? building : '';
    const current = this.props.buildingTree.find(item => item.building === next);
    const units = current ? current.units : [];
    const result = { ...this.state, selectedBuilding: next, selectedUnit: '', keyword: '', units };

    this.setState(result);
  };

  handleUnitChange = (unit: string, checked: boolean) => {
    const next = checked ? unit : '';
    const result = { ...this.state, selectedUnit: next, keyword: '' };
    this.setState(result);
    if (this.state.selectedBuilding !== '') {
      this.fetchData(result);
    }
  };

  handleKeywordChange = (e: any) => {
    e.preventDefault();
    this.setState({
      selectedUnit: '',
      selectedBuilding: '',
      keyword: e.target.value,
    });
  };

  handleSearch = () => {
    this.fetchData(this.state);
  };

  fetchData = (options: Partial<SelectAndSearchState>) => {
    this.props.fetchData(options);
  };

  render() {
    const { buildings, units, selectedBuilding, selectedUnit, keyword
    } = this.state;

    return (
      <Fragment>
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>楼号：</span>
          {buildings.map((building: string) => (
            <CheckableTag
              style={{ fontSize: 14 }}
              key={`building${building}`}
              checked={selectedBuilding === building}
              onChange={checked => this.handleBuildingChange(building, checked)}
            >
              {building}
            </CheckableTag>
          ))}
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>单元：</span>
          {units.map((unit: string) => (
            <CheckableTag
              style={{ fontSize: 14 }}
              key={`unit${unit}`}
              checked={selectedUnit === unit}
              onChange={checked => this.handleUnitChange(unit, checked)}
            >
              {unit}
            </CheckableTag>
          ))}
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
        <div style={{ display: ' flex', alignItems: 'center' }}>
          <span style={{ marginRight: 8, display: 'inline' }}>搜索：</span>
          <Search
            style={{ width: 400 }}
            placeholder="姓名，房间号，或电话"
            value={keyword}
            onChange={e => this.handleKeywordChange(e)}
            onSearch={() => this.handleSearch()}
            enterButton
          />
        </div>
      </Fragment>
    );
  }
}

export default SelectAndSearch;
