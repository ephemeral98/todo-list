import { styled } from 'styled-components';
import TodoHeader from './TodoHeader';

const TodoListWrap = styled.div`
  padding: 20px 10px;
`;

const TodoList = () => {
  return (
    <TodoListWrap>
      <TodoHeader>todo</TodoHeader>
    </TodoListWrap>
  );
};

export default TodoList;
