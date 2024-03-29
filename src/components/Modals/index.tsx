import { Input, Modal } from '@arco-design/web-react';
import { FC, useEffect, useState } from 'react';
import { useAddCategory, useUpdateCategory, useDeleteCategory } from '@/service/useTodoListApi';

export interface IAddCategoryModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export interface IUpdateCategoryModalProps extends IAddCategoryModalProps {
  name: string;
  id: string;
}

export interface IDeleteCategoryModalProps extends IUpdateCategoryModalProps {}

/**
 * 新增分类
 * @param props
 */
export const AddCategoryModal: FC<IAddCategoryModalProps> = (props) => {
  const { addCategory, loadAddCategory } = useAddCategory();
  const [inpName, setInpName] = useState('');

  const doAddCategory = async () => {
    await addCategory();
    props.onOk();
  };

  return (
    <Modal
      title="新增分类"
      visible={props.visible}
      onOk={doAddCategory}
      onCancel={props.onCancel}
      autoFocus={false}
      focusLock={true}
      confirmLoading={loadAddCategory}
    >
      <form
        className="flex-center"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log('提交');
          doAddCategory();
        }}
      >
        <Input
          value={inpName}
          onChange={(val) => setInpName(val)}
          style={{ width: 350, height: 50, textAlign: 'center' }}
          allowClear
          placeholder="请输入分类名称"
        />
      </form>
    </Modal>
  );
};

/**
 * 修改分类
 * @param props
 */
export const UpdateCategoryModal: FC<IUpdateCategoryModalProps> = (props) => {
  const { updateCategory, loadUpdateCategory } = useUpdateCategory();
  const [inpName, setInpName] = useState('');

  useEffect(() => {
    setInpName(props.name);
  }, [props.name]);

  const doUpdateCategory = async () => {
    await updateCategory({ id: props.id, name: props.name });
    props.onOk();
  };

  return (
    <Modal
      title="修改分类"
      visible={props.visible}
      onOk={doUpdateCategory}
      onCancel={props.onCancel}
      autoFocus={false}
      focusLock={true}
      confirmLoading={loadUpdateCategory}
    >
      <form
        className="flex-center"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log('提交');
          doUpdateCategory();
        }}
      >
        <Input
          value={inpName}
          onChange={(val) => setInpName(val)}
          style={{ width: 350, height: 50, textAlign: 'center' }}
          allowClear
          placeholder="请输入分类名称"
        />
      </form>
    </Modal>
  );
};

/**
 * 删除分类
 * @param props
 */
export const DeleteCategoryModal: FC<IDeleteCategoryModalProps> = (props) => {
  const { deleteCategory, loadDeleteCategory } = useDeleteCategory();

  const doDeleteCategory = async () => {
    await deleteCategory({ id: props.id });
    props.onOk();
  };

  return (
    <Modal
      title="删除分类"
      visible={props.visible}
      onOk={doDeleteCategory}
      onCancel={props.onCancel}
      autoFocus={false}
      focusLock={true}
      confirmLoading={loadDeleteCategory}
    >
      确定要删除分类 <span className="font-bold">{props.name}</span> 吗？
    </Modal>
  );
};
