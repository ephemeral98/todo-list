'use client';

import 'uno.css';
import { styled } from 'styled-components';
import TodoHeader from './components/TodoHeader';
import TodoItem from './components/TodoItem';
import { FC, useCallback, useState } from 'react';
import update from 'immutability-helper';
import DragComp from '@cps/DragComp';
import { useHideDone } from './useTodoList';
import Waiting from '@/components/Waiting';
import ContextMenu from '@/components/ContextMenu';
import { Modal } from '@arco-design/web-react';
import { useDeleteTodoContent } from '@/service/useTodoListApi';
import { useRouter } from 'next/navigation';
import useTodoListStore, { ITodo } from '@/store/todoListStore';

const TodoListWrap = styled.div`
  padding: 20px 10px;

  .list-content {
    padding-left: 10rem;
    padding-right: 10rem;
    overflow: auto;
    background-color: #F3F4F6;
    width: 100%;
    height: calc(100vh - 40px - 50rem);

    > div {
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pickTodo, setPickTodo] = useState<ITodo>(); // 要删除或者编辑的Todo
  const { deleteTodoContent, loadDeleteTodoContent } = useDeleteTodoContent();
  const router = useRouter();
  const { curTodoList, setCurTodoList, loadTodoList } = useTodoListStore((state) => state);

  const onMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setCurTodoList({
        ...curTodoList,
        children: update(curTodoList.children, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, curTodoList.children[dragIndex]],
          ],
        }),
      });
    },
    [curTodoList]
  );

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
            {curTodoList.children
              ?.filter((item) => {
                if (showDone()) {
                  return item;
                }
                return !item.isDone;
              })
              .map((item, inx) => (
                <DragComp.Item key={item.id} id={item.id} index={inx} onMoveCard={onMoveCard}>
                  <ContextMenu
                    onEdit={() => {
                      setPickTodo(item);
                      router.push(`content?id=${curTodoList.id}&cid=${item.id}`);
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
                          const newList = curTodoList.children.map((it) => {
                            if (item.id === it.id) {
                              it.isDone = isDone;
                            }
                            return it;
                          });
                          setCurTodoList({ ...curTodoList, children: newList });
                        }}
                        onClick={() => {
                          const newList = curTodoList.children.map((it) => {
                            if (item.isDone) {
                              return it;
                            }
                            it.active = item.id === it.id;
                            return it;
                          });
                          setCurTodoList({ ...curTodoList, children: newList });
                        }}
                        active={item.active}
                        done={item.isDone}
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
        title="删除分确定要删除该Todo吗?"
        visible={showDeleteModal}
        onOk={async () => {
          console.log('确认删除');
          const resp = await deleteTodoContent(pickTodo?.id || '');
          resp && setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
        autoFocus={false}
        focusLock={true}
        confirmLoading={loadDeleteTodoContent}
      >
        {pickTodo?.content}
      </Modal>
    </>
  );
};

export default TodoList;
