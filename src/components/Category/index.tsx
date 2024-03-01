import { styled } from 'styled-components';
import CategoryItem from './CategoryItem';
import DragComp, { update } from '../DragComp';
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { ITodoCategory } from '@/service/useTodoApi';
import { KeyedMutator } from 'swr';
import Image from 'next/image';
import { IconPlus, IconPenFill, IconDelete } from '@arco-design/web-react/icon';
import { AddCategoryModal, UpdateCategoryModal, DeleteCategoryModal } from '../Modals';
import { Dropdown, Menu } from '@arco-design/web-react';

const CategoryWrap = styled.div`
  height: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */

  .cate-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }

  .category-list {
    flex: auto;
    overflow: auto;
  }

  .panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 50px;
    background-color: red;
  }
`;

interface IProps {
  todoCategory: ITodoCategory[];
  setTodoCategory: Dispatch<SetStateAction<ITodoCategory[]>>;
  loadTodoCategory: boolean;
  refreshTodoCategory: KeyedMutator<ITodoCategory[]>;
  onAddCategory?: () => void;
}
const Category: FC<IProps> = (props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onMoveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    props.setTodoCategory((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <>
      <CategoryWrap>
        <DragComp.Wrap className="category-list">
          {props.todoCategory?.map((item, inx) => (
            <DragComp.Item
              className="cate-item"
              key={item.id}
              index={inx}
              id={item.id}
              onMoveCard={onMoveCard}
            >
              <Dropdown
                trigger="contextMenu"
                position="bl"
                droplist={
                  <Menu>
                    <Menu.Item key="1" color="sky" onClick={() => setShowUpdateModal(true)}>
                      <IconPenFill /> 编辑
                    </Menu.Item>
                    <Menu.Item key="2" color="red" onClick={() => setShowDeleteModal(true)}>
                      <IconDelete /> 删除
                    </Menu.Item>
                  </Menu>
                }
              >
                <div>
                  <CategoryItem
                    onClick={() => {
                      const newList = props.todoCategory?.map((it) => {
                        it.active = item.id === it.id;
                        return it;
                      });
                      props.setTodoCategory(newList);
                    }}
                    name={item.name}
                    active={item.active}
                    count={item.count}
                  />
                </div>
              </Dropdown>
            </DragComp.Item>
          ))}
        </DragComp.Wrap>

        <section className="panel">
          <div className="flex-center">
            <Image src={require('@img/avatar.png')} alt="" className="w-30 h-30 rounded-[50%]" />
            <div className="ml-10 text-18 font-bold">Barry Guo</div>
          </div>
          <IconPlus onClick={() => setShowAddModal(true)} />
        </section>
      </CategoryWrap>

      {/* 新增分类 */}
      <AddCategoryModal
        visible={showAddModal}
        onOk={() => {
          setShowAddModal(false);
        }}
        onCancel={() => {
          setShowAddModal(false);
        }}
      />

      {/* 修改分类 */}
      <UpdateCategoryModal
        name=""
        visible={showUpdateModal}
        onOk={() => {
          setShowUpdateModal(false);
        }}
        onCancel={() => {
          setShowUpdateModal(false);
        }}
      />

      {/* 删除分类 */}
      <DeleteCategoryModal
        id=""
        name=""
        visible={showDeleteModal}
        onOk={() => {
          setShowDeleteModal(false);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
        }}
      />
    </>
  );
};

export default Category;
