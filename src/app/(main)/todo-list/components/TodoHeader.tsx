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
import { useHideDone } from '@hooks/useTodo';
import { useDeleteCategory, useDeleteTodoDone } from '@/service/useTodoListApi';
import useTodoListStore from '@/store/todoListStore';
import { useRouter } from 'next/navigation';
import { UpdateCategoryModal } from '@cps/Modals';
import { getRandom } from '@/utils';

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
  background-color: #f3f4f6;
  border-bottom: dashed 1px #c7c7c7a1;

  .arco-icon.arco-icon-more {
    color: #3a3a3b;
  }

  .arco-btn-text:not(.arco-btn-disabled):not(.arco-btn-loading):hover {
    background-color: transparent;
  }
`;

const TodoHeader: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { showDone, setDoneStatus } = useHideDone();
  const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false); // 修改分类
  const [showDelCategoryModal, setShowDelCategoryModal] = useState(false);
  const [showDelAllDoneModal, setShowDelAllDoneModal] = useState(false);
  const { deleteCategory, loadDeleteCategory } = useDeleteCategory();
  const { deleteTodoDone, loadDeleteTodoDone } = useDeleteTodoDone();
  const { curTodoList } = useTodoListStore((state) => state);

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
              <Menu.Item key="1" onClick={() => setShowUpdateCategoryModal(true)}>
                <Button type="text" size="mini">
                  <IconPenFill />
                  修改
                </Button>
              </Menu.Item>

              <Menu.Item
                key="2"
                onClick={() => {
                  setDoneStatus();
                  props.onHideDone();
                }}
              >
                <Button type="text" status="warning" size="mini">
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

              <Menu.Item
                key="3"
                onClick={() => {
                  setShowDelCategoryModal(true);
                }}
              >
                <Button type="text" status="danger" size="mini">
                  <IconDelete />
                  删除此分类
                </Button>
              </Menu.Item>
              <Menu.Item key="4">
                <Button
                  type="text"
                  status="danger"
                  size="mini"
                  onClick={() => setShowDelAllDoneModal(true)}
                >
                  <IconDelete />
                  删除所有已完成的todo
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <IconPlus
            style={{ color: '#3A3A3B' }}
            onClick={() => {
              router.push(`/content?id=${curTodoList.id}&cid=${getRandom(99, 999)}`);
            }}
          />
        </Dropdown.Button>
      </TodoHeaderWrap>

      <UpdateCategoryModal
        name={curTodoList.name}
        id={curTodoList.id}
        visible={showUpdateCategoryModal}
        onOk={() => setShowUpdateCategoryModal(false)}
        onCancel={() => setShowUpdateCategoryModal(false)}
      />

      <Modal
        title="删除此分类"
        visible={showDelCategoryModal}
        onOk={async () => {
          const resp = await deleteCategory({ id: curTodoList.id });
          resp && setShowDelCategoryModal(false);
        }}
        onCancel={() => setShowDelCategoryModal(false)}
        autoFocus={false}
        focusLock={true}
        confirmLoading={loadDeleteCategory}
      >
        确定要删除分类 <span className="font-bold">{curTodoList.name}</span> 吗？
      </Modal>

      <Modal
        visible={showDelAllDoneModal}
        onOk={async () => {
          const resp = await deleteTodoDone({ id: curTodoList.id });
          resp && setShowDelAllDoneModal(false);
        }}
        onCancel={() => setShowDelAllDoneModal(false)}
        autoFocus={false}
        focusLock={true}
        confirmLoading={loadDeleteTodoDone}
        style={{ textAlign: 'center' }}
      >
        <span style={{ fontSize: '16rem' }}>确定要删除该分类所有已完成的todo吗？</span>
      </Modal>
    </>
  );
};

export default TodoHeader;
