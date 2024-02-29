export const useHideDone = () => {
  const DONESTATUS = 'doneStatus';
  const showDone = () => {
    const  t = !!localStorage.getItem(DONESTATUS);
    console.log('!!localStorage.getItem(DONESTATUS)....', t);
    return t;
  };
  const setDoneStatus = () => localStorage.setItem(DONESTATUS, String(!showDone()));
  return {
    showDone,
    setDoneStatus,
  };
};
