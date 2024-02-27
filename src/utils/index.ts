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
