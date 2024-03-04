import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useTodoListStore from '@/store/todoListStore';

export const useTodoList = () => {
  const searchParams = useSearchParams();
  const { todoList, curTodoList, fetchTodoList, setTodoList, loadTodoList, setCurTodoList } =
    useTodoListStore((state) => state);

  useEffect(() => {
    fetchTodoList();
  }, []);

  useEffect(() => {
    if (todoList?.length) {
      const curId = searchParams.get('id');
      if (curId) {
        // 匹配todoList
        const curItem = todoList.find((item) => item.id === curId);
        setCurTodoList(curItem || todoList[0]);
      } else {
        setCurTodoList(todoList[0]);
      }
    }
  }, [todoList, searchParams.get('id')]);

  return {
    curTodoList,
    todoList,
    loadTodoList,
    fetchTodoList,
    setTodoList,
  };
};
