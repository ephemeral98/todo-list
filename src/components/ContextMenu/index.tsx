import { Dropdown, Menu } from '@arco-design/web-react';
import { IconDelete, IconPenFill } from '@arco-design/web-react/icon';
import { FC, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}
const ContextMenu: FC<IProps> = (props) => {
  return (
    <Dropdown
      trigger="contextMenu"
      position="bl"
      droplist={
        <Menu>
          <Menu.Item key="1" color="sky" onClick={props.onEdit}>
            <IconPenFill /> 编辑
          </Menu.Item>
          <Menu.Item key="2" color="red" onClick={props.onDelete}>
            <IconDelete /> 删除
          </Menu.Item>
        </Menu>
      }
    >
      {props.children}
    </Dropdown>
  );
};

export default ContextMenu;
