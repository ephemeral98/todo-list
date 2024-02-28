import React from 'react';
import { styled } from 'styled-components';

const TodoHeaderWrap = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const TodoHeader: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return <TodoHeaderWrap style={style}>{children}</TodoHeaderWrap>;
};

export default TodoHeader;
