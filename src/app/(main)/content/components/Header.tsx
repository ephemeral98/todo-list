import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Popover, DatePicker, Modal } from '@arco-design/web-react';
import { IconDelete, IconArrowLeft } from '@arco-design/web-react/icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteCategory } from '@/service/useTodoListApi';
import useTodoListStore from '@store/todoListStore';

interface IProps {
  style?: React.CSSProperties;
}

const ContentHeaderWrap = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f4f6;
  height: 50rem;
  border-radius: 7px;
  padding: 0 15rem;

  .arco-icon.arco-icon-more {
    color: #3a3a3b;
  }

  .arco-btn-text:not(.arco-btn-disabled):not(.arco-btn-loading):hover {
    background-color: transparent;
  }
`;

const ContentHeader: React.FC<IProps> = (props) => {
  const router = useRouter();
  const query = useSearchParams();
  const { deleteCategory, loadDeleteCategory } = useDeleteCategory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { curTodoList } = useTodoListStore((state) => state);

  function onOk(dateString: any, date: any) {
    console.log('onOk: ', dateString, date);
  }
  return (
    <>
      <ContentHeaderWrap style={props.style}>
        <IconArrowLeft
          onClick={() => {
            router.replace(`todo-list?id=${curTodoList.id}`);
          }}
          cursor={'pointer'}
          fontSize={'20px'}
        />
        <div className="flex-center">
          <DatePicker
            placeholder="提醒时间"
            style={{ width: 200, marginRight: 20 }}
            showTime={{
              defaultValue: '15:04:05',
            }}
            format="YYYY-MM-DD HH:mm:ss"
            onOk={onOk}
          />
          <Popover content={<span style={{ whiteSpace: 'nowrap' }}>删除该Todo</span>}>
            <IconDelete
              type="danger"
              color="red"
              fontSize={'22px'}
              cursor={'pointer'}
              onClick={async () => {
                setShowDeleteModal(true);
              }}
            />
          </Popover>
        </div>
      </ContentHeaderWrap>

      <Modal
        title="删除Todo"
        visible={showDeleteModal}
        onOk={async () => {
          const cid = query.get('cid');
          const resp = await deleteCategory({ id: cid || '' });
          const id = query.get('id');
          if (resp) {
            setShowDeleteModal(false);
            router.replace(`todo-list?id=${id}`);
          }
        }}
        onCancel={() => setShowDeleteModal(false)}
        autoFocus={false}
        focusLock={true}
        confirmLoading={loadDeleteCategory}
      >
        确定要删除Todo吗?
      </Modal>
    </>
  );
};

export default ContentHeader;
