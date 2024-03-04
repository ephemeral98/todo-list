import React from 'react';
import { styled } from 'styled-components';
import { Button, Dropdown, Menu, Popover, DatePicker } from '@arco-design/web-react';
import {
  IconPlus,
  IconPenFill,
  IconDelete,
  IconEye,
  IconEyeInvisible,
  IconArrowLeft,
} from '@arco-design/web-react/icon';
import { useRouter } from 'next/navigation';

interface IProps {
  style?: React.CSSProperties;
}

const ContentHeaderWrap = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #008c8c;
  height: 50rem;

  .arco-icon.arco-icon-more {
    color: #3a3a3b;
  }

  .arco-btn-text:not(.arco-btn-disabled):not(.arco-btn-loading):hover {
    background-color: transparent;
  }
`;

const ContentHeader: React.FC<IProps> = (props) => {
  const router = useRouter();

  function onOk(dateString: any, date: any) {
    console.log('onOk: ', dateString, date);
  }
  return (
    <ContentHeaderWrap style={props.style}>
      <IconArrowLeft
      onClick={() => {
        router.back();
      }}
      cursor={'pointer'} fontSize={'20px'}/>
      <div className='flex-center'>
        <DatePicker
          style={{ width: 200, marginRight: 20 }}
          showTime={{
            defaultValue: '04:05:06',
          }}
          format="YYYY-MM-DD HH:mm:ss"
          onOk={onOk}
        />
        <Popover content={<span style={{ whiteSpace: 'nowrap' }}>删除该Todo</span>}>
          <IconDelete type="danger" color="red" fontSize={'22px'} />
        </Popover>
      </div>
    </ContentHeaderWrap>
  );
};

export default ContentHeader;
