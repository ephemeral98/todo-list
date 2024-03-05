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

/**
 * 删除此分类
 */
export const useDeleteTodo = () => {
  const { trigger, isMutating } = useSWRMutation(
    '/api/todo/delete',
    async (url: string, { arg }: { arg: { id: string } }) => {
      console.log('deleteTodo....', arg.id);
      await sleep(3000);
      return true;
    }
  );

  return {
    deleteTodo: trigger,
    loadDeleteTodo: isMutating,
  };
};
