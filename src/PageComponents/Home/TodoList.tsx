import { styled } from 'styled-components';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
import { FC, useCallback, useState } from 'react';
import update from 'immutability-helper';
import DragComp from '@cps/DragComp';
import { useHideDone } from './useTodoList';
import { useTodos } from '@/service/useCategoryApi';
import Waiting from '@/components/Waiting';
import ContextMenu from '@/components/ContextMenu';
import { ITodo } from '@/service/useCategoryApi';
import { Modal } from '@arco-design/web-react';
import { useDeleteTodo } from '@/service/useTodoApi';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pickTodo, setPickTodo] = useState<ITodo>(); // 要删除或者编辑的Todo
  const { deleteTodo, loadDeleteTodo } = useDeleteTodo();

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
    <>
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
                if (showDone()) {
                  return item;
                }
                return !item.done;
              })
              .map((item, inx) => (
                <DragComp.Item key={item.id} id={item.id} index={inx} onMoveCard={onMoveCard}>
                  <ContextMenu
                    onEdit={() => {
                      setPickTodo(item);
                      // setShowUpdateModal(true);
                    }}
                    onDelete={() => {
                      setPickTodo(item);
                      setShowDeleteModal(true);
                    }}
                  >
                    <div>
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
                    </div>
                  </ContextMenu>
                </DragComp.Item>
              ))}
          </DragComp.Wrap>
        </Waiting>
      </TodoListWrap>

      <Modal
        title="删除分确定要删除该Todo吗？"
        visible={showDeleteModal}
        onOk={async () => {
          console.log('确认删除');
          const resp = await deleteTodo(pickTodo?.id || '');
          resp && setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
        autoFocus={false}
        focusLock={true}
      >
        {pickTodo?.content}
      </Modal>
    </>
  );
};

export default TodoList;
