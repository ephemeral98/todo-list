import { localMemory } from 'localmemory';

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
