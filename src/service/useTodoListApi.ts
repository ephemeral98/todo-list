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
 * 获取列表
 */
export const useDeleteTodo = () => {
  const { data, isLoading, mutate } = useSWR('/api/todo/', async () => {
    await sleep(3000);
    return [
      {
        id: '1',
        active: false,
        name: '分类1',
        count: 999,
        content: [
          {
            id: '1',
            content: 'lorem11111',
            isDone: false,
            active: false,
          },
          {
            id: '2',
            content: 'lorem22222',
            isDone: false,
            active: false,
          },
          {
            id: '3',
            content: 'lorem33333',
            isDone: false,
            active: false,
          },
          {
            id: '4',
            content: 'lorem44444',
            isDone: false,
            active: false,
          },
        ],
      },
      {
        id: '2',
        active: false,
        name: '分类2',
        count: 999,
        content: [
          {
            id: '1',
            content: '分类111111',
            isDone: false,
            active: false,
          },
          {
            id: '2',
            content: '分类22222',
            isDone: false,
            active: false,
          },
        ],
      },
      {
        id: '3',
        active: false,
        name: '分类33',
        count: 999,
        content: [
          {
            id: '1',
            content: '分类3333',
            isDone: false,
            active: false,
          },
        ],
      },
    ];
  });

  return {
    todoList: data,
    loadTodoList: isLoading,
    refreshTodoList: mutate,
  };
};
