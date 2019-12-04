import React, { Fragment } from 'react';
import { Tag, Divider } from 'antd';
import { LivingFetchParams } from '@/services/living';

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

export interface SelectTagsState {
  selectedCategory: string;
  selectedBuilding: string;
  selectedUnit: string;
}

interface SelectTagsProps {
  params: LivingFetchParams;
  fetchData: (options: LivingFetchParams) => void;
}

class SelectTags extends React.Component<SelectTagsProps, SelectTagsState> {
  state: SelectTagsState = {
    selectedCategory: '',
    selectedBuilding: '',
    selectedUnit: '',
  };
  componentDidMount = () => {
    const { params } = this.props;
    this.setState({
      selectedCategory: params.selectedCategory || '',
      selectedBuilding: params.selectedBuilding || '',
      selectedUnit: params.selectedUnit || '',
    });
  };

  handleCategoryChange = (category: string, checked: boolean) => {
    const next = checked ? category : '';
    const result = { ...this.state, selectedCategory: next };
    this.setState(result);
    this.fetchData(result);
  };
  handleBuildingChange = (building: string, checked: boolean) => {
    const next = checked ? building : '';
    const result = { ...this.state, selectedBuilding: next, selectedUnit: '' };
    this.setState(result);
    this.fetchData(result);
  };
  handleUnitChange = (unit: string, checked: boolean) => {
    const next = checked ? unit : '';
    const result = { ...this.state, selectedUnit: next };
    this.setState(result);
    this.fetchData(result);
  };
  fetchData = (options: SelectTagsState) => {
    if (options.selectedBuilding !== '' && options.selectedUnit !== '') {
      this.props.fetchData(options);
    }
  };
  render() {
    const { selectedCategory, selectedBuilding, selectedUnit } = this.state;
    return (
      <Fragment>
        <div>
          <span style={{ marginRight: 8, display: 'inline' }}>类型：</span>
          {categories.map((category: string) => (
            <CheckableTag
              style={{ fontSize: 14 }}
              key={'category' + category}
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
              key={'building' + building}
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
              key={'unit' + unit}
              checked={selectedUnit === unit}
              onChange={checked => this.handleUnitChange(unit, checked)}
            >
              {unit}
            </CheckableTag>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default SelectTags;
