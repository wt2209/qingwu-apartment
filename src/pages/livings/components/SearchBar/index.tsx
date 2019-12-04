import React from 'react';
import { Input } from 'antd';
import { LivingFetchParams } from '@/services/living';
const { Search } = Input;

interface State {
  keyword: string;
}
interface Props {
  params: LivingFetchParams;
  fetchData: (options: LivingFetchParams) => void;
}
class SearchBar extends React.Component<Props, State> {
  state: State = {
    keyword: '',
  };
  componentDidMount = () => {
    const { params } = this.props;
    this.setState({
      keyword: params.keyword || '',
    });
  };

  render() {
    const { fetchData } = this.props;
    return (
      <div style={{ display: ' flex', alignItems: 'center' }}>
        <span style={{ marginRight: 8, display: 'inline' }}>搜索：</span>
        <Search
          style={{ width: 400 }}
          placeholder="姓名，房间号，或电话"
          onSearch={value => fetchData({ keyword: value })}
          enterButton
        />
      </div>
    );
  }
}

export default SearchBar;
