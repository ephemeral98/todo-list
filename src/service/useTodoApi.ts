import { sleep } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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

export const useTodoCategory = () => {
  const [todoCategory, setTodoCategory] = useState<ITodoCategory[]>([]);
  const { data, isLoading, mutate } = useSWR<ITodoCategory[]>('/api/category', async () => {
    await sleep(2000);
    return [
      {
        id: '1',
        active: false,
        name: '分类1',
        count: 999,
      },
      {
        id: '2',
        active: true,
        name: '分类2',
        count: 999,
      },
      {
        id: '3',
        active: false,
        name: '分类33',
        count: 999,
      },
    ];
  });

  useEffect(() => {
    if (data?.length) {
      if (todoCategory.length) {
        const activeItem = todoCategory.find((item) => item.active);
        const newList = data.map((item) => {
          if (activeItem?.id === item.id) {
            item.active = true;
          }
          return item;
        });
        setTodoCategory(newList);
      } else {
        setTodoCategory(data);
      }
    }
  }, [data]);

  const activeCategory = useMemo(() => todoCategory.find((item) => item.active), [todoCategory]);

  return {
    todoCategory,
    setTodoCategory,
    activeCategory,
    loadTodoCategory: isLoading,
    refreshTodoCategory: mutate,
  };
};

export const useTodos = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const { data, isLoading, mutate } = useSWR<ITodo[]>('/api/todos', async () => {
    await sleep(2000);
    return [
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
      {
        id: '5',
        active: false,
        content: '内容4444内容4444内容4444内容4444内容4444内容4444内容4444内容4444',
        done: true,
      },
      {
        id: '6',
        active: false,
        content: '内容4444内容4444内容4444内容4444内容4444内容4444内容4444内容4444',
        done: true,
      },
    ];
  });

  useEffect(() => {
    if (data?.length) {
      if (todoList.length) {
        const activeItem = todoList.find((item) => item.active);
        const newList = data.map((item) => {
          if (activeItem?.id === item.id) {
            item.active = true;
          }
          return item;
        });
        setTodoList(newList);
      } else {
        setTodoList(data);
      }
    }
  }, [data]);

  return {
    todoList,
    setTodoList,
    loadTodoList: isLoading,
    refreshTodo: mutate,
  };
};

/**
 * 新增分类
 */
export const useAddCategory = () => {
  const { trigger, isMutating } = useSWRMutation('/api/add', async () => {
    await sleep(2000);
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
  const { trigger, isMutating } = useSWRMutation('/api/update', async () => {
    await sleep(2000);
    return true;
  });

  return {
    updateCategory: trigger,
    loadUpdateCategory: isMutating,
  };
};

/**
 * 删除分类
 */
export const useDeleteCategory = () => {
  const { trigger, isMutating } = useSWRMutation('/api/delete', async () => {
    await sleep(2000);
    return true;
  });

  return {
    deleteCategory: trigger,
    loadDeleteCategory: isMutating,
  };
};
