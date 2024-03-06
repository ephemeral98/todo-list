/**
 * 获取具名插槽
 */
export const getSlot = (props: { children: React.ReactNode }) => {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  const slots = children.reduce((slots, item) => {
    slots[item?.props?.slot] = item;
    return slots;
  }, {});
  return slots;
};

/**
 * 判断是否客户端; true是
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};

/**
 * 睡眠函数
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 */
export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
