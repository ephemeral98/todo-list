import React from 'react';
import { styled } from 'styled-components';
import { Button, Dropdown, Menu } from '@arco-design/web-react';
import {
  IconPlus,
  IconPenFill,
  IconDelete,
  IconEye,
  IconEyeInvisible,
} from '@arco-design/web-react/icon';

interface IProps {
  style?: React.CSSProperties;
}

const ContentHeaderWrap = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #008c8c;

  .arco-icon.arco-icon-more {
    color: #3a3a3b;
  }

  .arco-btn-text:not(.arco-btn-disabled):not(.arco-btn-loading):hover {
    background-color: transparent;
  }
`;

const ContentHeader: React.FC<IProps> = (props) => {
  return (
    <ContentHeaderWrap style={props.style}>
      <div>返回</div>
      <div>选择日期</div>
      <div>保存？</div>
      <div>删除</div>
    </ContentHeaderWrap>
  );
};

export default ContentHeader;
