import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}  style={{marginTop:'13px'}}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href="/favorite">찜하기</a>
      </Menu.Item>
      <Menu.Item key="post">
        <a href="/post">게시판</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu