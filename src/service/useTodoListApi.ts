import { sleep } from '@/utils';
import useSWRMutation from 'swr/mutation';
import { Message } from '@arco-design/web-react';

export interface ITodoCategory {
  id: string;
  active: boolean;
  name: string;
  count: number;
}

export interface ITodo {
  id: string;
  active: boolean;
  content: string;
  done: boolean;
}

/**
 * 新增分类
 */
export const useAddCategory = () => {
  const { trigger, isMutating } = useSWRMutation('/api/add', async () => {
    await sleep(2000);
    Message.success('新增成功');
    return true;
  });

  return {
    addCategory: trigger,
    loadAddCategory: isMutating,
  };
};

/**
 * 修改分类
 */
export const useUpdateCategory = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/update',
    async (url: string, { arg }: { arg: { id: string; name: string } }) => {
      console.log('修改分类...', arg.id, arg.name);
      await sleep(2000);
      Message.success('修改成功');
      return true;
    }
  );

  return {
    updateCategory: trigger,
    loadUpdateCategory: isMutating,
  };
};

/**
 * 删除此分类
 */
export const useDeleteCategory = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/todo/delete',
    async (url: string, { arg }: { arg: { id: string } }) => {
      console.log('deleteTodo....', arg.id);
      await sleep(3000);
      Message.success('删除成功');
      return true;
    }
  );

  return {
    deleteCategory: trigger,
    loadDeleteCategory: isMutating,
  };
};

/**
 * 删除该分类的所有已完成todo
 */
export const useDeleteTodoDone = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/todo/deleteDone',
    async (url: string, { arg }: { arg: { id: string } }) => {
      console.log('deleteDone....', arg.id);
      await sleep(3000);
      Message.success('删除成功');
      return true;
    }
  );

  return {
    deleteTodoDone: trigger,
    loadDeleteTodoDone: isMutating,
  };
};

/**
 * 删除todo
 */
export const useDeleteTodoContent = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/todo/delete',
    async (url: string, { arg }: { arg: string }) => {
      console.log('删除的todo...', arg);
      await sleep(3000);
      Message.success('删除成功');
      return true;
    }
  );

  return {
    deleteTodoContent: trigger,
    loadDeleteTodoContent: isMutating,
  };
};
