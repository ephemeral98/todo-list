import { styled } from 'styled-components';
import { Checkbox } from '@arco-design/web-react';
import React from 'react';

const TodoItemWrap = styled.div<{ $done: boolean; $active: boolean }>`
  display: flex;
  background-color: ${(props) => (props.$active ? '#9a9a9b' : '#fff')};
  box-shadow: 0 0 10px gray;
  border-radius: 5rem;
  opacity: ${(props) => (props.$done ? 0.5 : 1)};
  text-decoration: ${(props) => (props.$done ? 'line-through' : 'none')};

  > div {
    padding: 10px 6px;
  }
`;

interface IProps {
  done: boolean; // 是否已完成
  active: boolean; // 是否选中状态
  children: React.ReactNode;
  onClick: () => void;
  onCheck: (isCheck: boolean) => void;
}
const TodoItem: React.FC<IProps> = (props) => {
  return (
    <TodoItemWrap $done={props.done} $active={props.active}>
      <div>
        <Checkbox checked={props.done} onChange={(e) => props.onCheck(e)}></Checkbox>
      </div>
      <div onClick={props.onClick} style={{ flex: 'auto' }} className="ml-10">
        {props.children}
      </div>
    </TodoItemWrap>
  );
};

export default TodoItem;
