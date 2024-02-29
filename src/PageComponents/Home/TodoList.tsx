import { styled } from 'styled-components';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { useCallback, useState } from 'react';
import update from 'immutability-helper';
import DragComp from '@cps/DragComp';
import { useHideDone } from './useTodoList';

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

const TodoList = () => {
  const [hideDone, setHideDone] = useState(false);
  const { showDone } = useHideDone();

  const [data, setData] = useState([
    {
      id: '1',
      active: false,
      content: '内容11内容11内容11内容11内容11内容11内容11内容11内容11',
      done: false,
    },
    {
      id: '2',
      active: true,
      content: '内容22内容22内容22内容22内容22内容22内容22内容22内容22',
      done: false,
    },
    {
      id: '3',
      active: false,
      content:
        '内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33内容33',
      done: false,
    },
    {
      id: '4',
      active: false,
      content: '内容4444内容4444内容4444内容4444内容4444内容4444内容4444内容4444',
      done: true,
    },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <TodoListWrap>
      <TodoHeader
        style={{ height: '50rem' }}
        onHideDone={() => setHideDone(!hideDone)}
        onDeleteDone={() => {}}
      >
        todo
      </TodoHeader>
      <DragComp.Wrap className="list-content">
        {data
          .filter((item) => {
            if (!showDone()) {
              return item;
            }
            return item.done;
          })
          .map((item, inx) => (
            <DragComp.Item key={item.id} id={item.id} index={inx} moveCard={moveCard}>
              <TodoItem
                onCheck={(isDone) => {
                  const newList = data.map((it) => {
                    if (item.id === it.id) {
                      it.done = isDone;
                    }
                    return it;
                  });
                  setData(newList);
                }}
                onClick={() => {
                  const newList = data.map((it) => {
                    if (item.done) {
                      return it;
                    }
                    it.active = item.id === it.id;
                    return it;
                  });
                  setData(newList);
                }}
                active={item.active}
                done={item.done}
              >
                {item.content}
              </TodoItem>
            </DragComp.Item>
          ))}
      </DragComp.Wrap>
    </TodoListWrap>
  );
};

export default TodoList;
