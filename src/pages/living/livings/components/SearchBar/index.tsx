import React from 'react';
import { Input } from 'antd';
import { LivingFetchParams } from '@/pages/living/livings/service';

const { Search } = Input;


export interface SearchBarState {
  keyword: string;
}

interface SearchBarProps {
  params: LivingFetchParams;
  fetchData: (options: LivingFetchParams) => void;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    keyword: '',
  };

  componentDidMount = () => {
    const { params } = this.props;
    this.setState({
      keyword: params.keyword || '',
    });
  };

  componentDidUpdate = (prevProps: SearchBarProps) => {
    const { params } = this.props;
    const shouldUpdate = Object.keys(params).some(key => params[key] !== prevProps.params[key]);
    if (shouldUpdate) {
      this.setState({
        ...this.state,
        ...this.props.params,
      });
    }
  };

  handleKeywordChange = (e: any) => {
    e.preventDefault();
    this.setState({
      keyword: e.target.value,
    });
  };

  handleSearch = () => {
    this.fetchData(this.state);
  };

  fetchData = (options: SearchBarState) => {
    this.props.fetchData(options);
  };

  render() {
    const { keyword } = this.state;

    return (
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
    );
  }
}

export default SearchBar;
