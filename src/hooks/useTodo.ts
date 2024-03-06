import { localMemory } from 'localmemory';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useTodoListStore from '@/store/todoListStore';

export const useHideDone = () => {
  const DONESTATUS = 'doneStatus';

  /**
   * 显示已经完成的todo
   */
  const showDone = () => !!+(localMemory.getItem(DONESTATUS) || '');

  /**
   * 设置显示已经完成的状态
   */
  const setDoneStatus = () => {
    const isDone = showDone();
    localMemory.setItem({ name: DONESTATUS, value: isDone ? '0' : '1' });
  };

  return {
    showDone,
    setDoneStatus,
  };
};

export const useTodoList = () => {
  const query = useSearchParams();
  const { todoList, curTodoList, fetchTodoList, setTodoList, loadTodoList, setCurTodoList } =
    useTodoListStore((state) => state);

  useEffect(() => {
    fetchTodoList();
  }, []);

  useEffect(() => {
    if (todoList?.length) {
      const curId = query.get('id');
      if (curId) {
        // 匹配todoList
        const curItem = todoList.find((item) => item.id === curId);
        setCurTodoList(curItem || todoList[0]);
      } else {
        setCurTodoList(todoList[0]);
      }
    }
  }, [todoList, query.get('id')]);

  return {
    curTodoList,
    todoList,
    loadTodoList,
    fetchTodoList,
    setTodoList,
  };
};
