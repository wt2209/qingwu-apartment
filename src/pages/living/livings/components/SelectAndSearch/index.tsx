import React, { Fragment } from 'react';
import { Tag, Divider, Input } from 'antd';
import { LivingFetchParams } from '@/pages/living/livings/service';

const { Search } = Input;
const { CheckableTag } = Tag;
const categories = ['新员工', '单身职工', '劳务派遣工', '随企业搬迁职工', '包商公司'];
const buildings = [
  '1#',
  '2#',
  '3#',
  '4#',
  '5#',
  '6#',
  '7#',
  '8#',
  '9#',
  '10#',
  '11#',
  '12#',
  '13#',
  '14#',
  '红1#',
  '红2#',
  '红3#',
  '高1#',
  '高2#',
  '高3#',
  '高4#',
];
const units = ['1单元', '2单元', '3单元', '4单元'];

export interface SelectAndSearchState {
  selectedCategory: string;
  selectedBuilding: string;
  selectedUnit: string;
  keyword: string;
}

interface SelectAndSearchProps {
  params: LivingFetchParams;
  fetchData: (options: LivingFetchParams) => void;
}

class SelectAndSearch extends React.Component<SelectAndSearchProps, SelectAndSearchState> {
  state: SelectAndSearchState = {
    selectedCategory: '',
    selectedBuilding: '',
    selectedUnit: '',
    keyword: '',
  };

  componentDidMount = () => {
    const { params } = this.props;
    this.setState({
      selectedCategory: params.selectedCategory || '',
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

  handleCategoryChange = (category: string, checked: boolean) => {
    const next = checked ? category : '';
    const result = { ...this.state, selectedCategory: next, keyword: '' };
    this.setState(result);
    this.fetchData(result);
  };

  handleBuildingChange = (building: string, checked: boolean) => {
    const next = checked ? building : '';
    const result = { ...this.state, selectedBuilding: next, selectedUnit: '', keyword: '' };
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
      selectedCategory: '',
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
    const { selectedBuilding, selectedUnit, selectedCategory, keyword } = this.state;

    return (
      <Fragment>
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>类型：</span>
          {categories.map((category: string) => (
            <CheckableTag
              style={{ fontSize: 14 }}
              key={`category${category}`}
              checked={selectedCategory === category}
              onChange={checked => this.handleCategoryChange(category, checked)}
            >
              {category}
            </CheckableTag>
          ))}
        </div>
        <Divider dashed style={{ margin: '6px 0' }} />
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
