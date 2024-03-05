import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Button, Dropdown, Menu, Modal } from '@arco-design/web-react';
import {
  IconPlus,
  IconPenFill,
  IconDelete,
  IconEye,
  IconEyeInvisible,
} from '@arco-design/web-react/icon';
import { useHideDone } from './useTodoList';
import { useDeleteTodo } from '@/service/useTodoListApi';
import useTodoListStore from '@/store/todoListStore';

interface IProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onHideDone: () => void;
  onDeleteDone: () => void;
}

const TodoHeaderWrap = styled.div`
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

const TodoHeader: React.FC<IProps> = (props) => {
  const { showDone, setDoneStatus } = useHideDone();
  const [showDelCategoryModal, setShowDelCategoryModal] = useState(false);
  const [showDelAllDoneModal, setShowDelAllDoneModal] = useState(false);
  const { deleteTodo, loadDeleteTodo } = useDeleteTodo();
  const { todoList, curTodoList, fetchTodoList, setTodoList, loadTodoList, setCurTodoList } =
    useTodoListStore((state) => state);

  return (
    <>
      <TodoHeaderWrap style={props.style}>
        <div>{props.children}</div>
        <Dropdown.Button
          type="text"
          style={{ display: 'flex', color: 'red' }}
          onClick={() => {}}
          droplist={
            <Menu style={{ color: '#3A3A3B' }}>
              <Menu.Item key="1">
                <Button type="text" size="mini" onClick={() => {}}>
                  <IconPenFill />
                  修改
                </Button>
              </Menu.Item>

              <Menu.Item key="2">
                <Button
                  type="text"
                  status="warning"
                  size="mini"
                  onClick={() => {
                    setDoneStatus();
                    props.onHideDone();
                  }}
                >
                  {showDone() ? (
                    <>
                      <IconEyeInvisible />
                      隐藏已完成
                    </>
                  ) : (
                    <>
                      <IconEye />
                      显示已完成
                    </>
                  )}
                </Button>
              </Menu.Item>

              <Menu.Item key="3">
                <Button
                  type="text"
                  status="danger"
                  size="mini"
                  onClick={() => {
                    setShowDelCategoryModal(true);
                  }}
                >
                  <IconDelete />
                  删除此分类
                </Button>
              </Menu.Item>
              <Menu.Item key="4">
                <Button type="text" status="danger" size="mini" onClick={props.onDeleteDone}>
                  <IconDelete />
                  删除所有已完成的todo
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <IconPlus style={{ color: '#3A3A3B' }} />
        </Dropdown.Button>
      </TodoHeaderWrap>

      <Modal
        title="删除此分类"
        visible={showDelCategoryModal}
        onOk={() => {
          deleteTodo({ id: curTodoList.id });
          setShowDelCategoryModal(false);
        }}
        onCancel={() => setShowDelCategoryModal(false)}
        autoFocus={false}
        focusLock={true}
        confirmLoading={loadDeleteTodo}
      >
        确定要删除分类 <span className="font-bold">{curTodoList.name}</span> 吗？
      </Modal>
    </>
  );
};

export default TodoHeader;
