import { sleep } from '@/utils';
import { create } from 'zustand';

export interface ITodo {
  id: string;
  content: string;
  isDone: boolean;
  active: boolean;
}

export interface ITodoList {
  id: string;
  active: boolean;
  name: string;
  count: number;
  children: ITodo[];
}

interface ITodoListStore {
  todoList: ITodoList[];
  setTodoList: (preTodoList: ITodoList[]) => any;
  curTodoList: ITodoList;
  setCurTodoList: (preTodoList: ITodoList) => any;
  loadTodoList: boolean;
  fetchTodoList: () => Promise<void>;
}

const useTodoListStore = create<ITodoListStore>((set) => ({
  todoList: [], // 分类列表
  setTodoList: (preTodoList: ITodoList[]) => set(() => ({ todoList: preTodoList })),
  loadTodoList: false, // 加载中
  curTodoList: {} as ITodoList, // 当前分类
  /**
   * 设置当前分类
   * @param preTodo 
   * @returns 
   */
  setCurTodoList: (preTodo: ITodoList) => set(() => ({ curTodoList: preTodo })),
  /**
   * 获取todo列表
   */
  fetchTodoList: async () => {
    set(() => ({ loadTodoList: true }));
    await sleep(3000);
    const resp = [
      {
        id: '1',
        active: false,
        name: '分类1',
        count: 999,
        children: [
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
        children: [
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
        children: [
          {
            id: '1',
            content: '分类3333',
            isDone: false,
            active: false,
          },
        ],
      },
    ];
    set(() => ({ loadTodoList: false }));
    set(() => ({ todoList: resp }));
  },
}));

export default useTodoListStore;
