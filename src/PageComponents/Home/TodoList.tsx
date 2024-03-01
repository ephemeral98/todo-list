import { styled } from 'styled-components';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { FC, useCallback, useState } from 'react';
import update from 'immutability-helper';
import DragComp from '@cps/DragComp';
import { useHideDone } from './useTodoList';
import { useTodos } from '@/service/useTodoApi';
import Waiting from '@/components/Waiting';

const TodoListWrap = styled.div`
  padding: 20px 10px;

  .list-content {
    padding-left: 10rem;
    padding-right: 10rem;
    overflow: auto;
    background-color: pink;
    height: calc(100vh - 40px - 50rem);

    > div:not(:first-child) {
      margin-top: 10rem;
    }
  }
`;

interface IProps {
  title: string;
}

const TodoList: FC<IProps> = (props) => {
  const [hideDone, setHideDone] = useState(false);
  const { showDone } = useHideDone();
  const { todoList, setTodoList, loadTodoList, refreshTodo } = useTodos();

  const onMoveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodoList((todoList) => {
      return update(todoList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, todoList![dragIndex]],
        ],
      });
    });
  }, []);

  return (
    <TodoListWrap>
      <TodoHeader
        style={{ height: '50rem' }}
        onHideDone={() => setHideDone(!hideDone)}
        onDeleteDone={() => {}}
      >
        {props.title}
      </TodoHeader>
      <Waiting isLoading={loadTodoList}>
        <DragComp.Wrap className="list-content">
          {todoList
            ?.filter((item) => {
              if (!showDone()) {
                return item;
              }
              return item.done;
            })
            .map((item, inx) => (
              <DragComp.Item key={item.id} id={item.id} index={inx} onMoveCard={onMoveCard}>
                <TodoItem
                  onCheck={(isDone) => {
                    const newList = todoList.map((it) => {
                      if (item.id === it.id) {
                        it.done = isDone;
                      }
                      return it;
                    });
                    setTodoList(newList);
                  }}
                  onClick={() => {
                    const newList = todoList.map((it) => {
                      if (item.done) {
                        return it;
                      }
                      it.active = item.id === it.id;
                      return it;
                    });
                    setTodoList(newList);
                  }}
                  active={item.active}
                  done={item.done}
                >
                  {item.content}
                </TodoItem>
              </DragComp.Item>
            ))}
        </DragComp.Wrap>
      </Waiting>
    </TodoListWrap>
  );
};

export default TodoList;
