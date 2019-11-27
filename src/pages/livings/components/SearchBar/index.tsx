import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
class SearchBar extends React.Component {
  render() {
    return (
      <div style={{ display: ' flex', alignItems: 'center' }}>
        <span style={{ marginRight: 8, display: 'inline' }}>搜索：</span>
        <Search
          style={{ width: 400 }}
          placeholder="姓名，房间号，或电话"
          onSearch={value => console.log(value)}
          enterButton
        />
      </div>
    );
  }
}

export default SearchBar;
