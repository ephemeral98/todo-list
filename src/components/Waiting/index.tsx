import { isClient } from '@/utils';
import { Spin } from '@arco-design/web-react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const WaitingWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;

  .wait-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .wait-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IProps {
  width?: string;
  height?: string;
  isLoading: boolean; // 加载状态
  isError?: boolean; // 请求失败
  bg?: string; // 遮罩层背景颜色
  children: ReactNode;
  onErrorRefresh?: () => void; // 请求失败的callback
}

const Waiting = (props: IProps) => {
  const loadContent = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState({
    width: 'auto',
    height: 'auto',
    borderRadius: '0px',
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const style = getComputedStyle(loadContent.current!.firstElementChild!);
    setContentSize({
      width: props.width || style.width,
      height: props.height || style.height,
      borderRadius: style.borderRadius,
    });
  }, [loadContent, isClient() && document.documentElement.style?.fontSize]);

  useEffect(() => {
    if (!Number.parseFloat(contentSize.height)) {
      return;
    }
    const div = loadContent?.current?.querySelector('div');
    div && (div.style.height = '100%');
  }, [contentSize]);

  return (
    <WaitingWrap
      style={{
        height:
          props.height || (Number.parseFloat(contentSize.height) ? contentSize.height : '100%'),
      }}
    >
      <div className="wait-content" ref={loadContent}>
        {props.children}
      </div>
      <div
        className="wait-mask"
        style={{
          display: props.isLoading || props.isError ? 'block' : 'none',
          backgroundColor: props.bg || '#c3c3c391',
          borderRadius: contentSize.borderRadius,
        }}
      ></div>

      <Spin
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          display: props.isLoading ? 'block' : 'none',
        }}
      />
    </WaitingWrap>
  );
};

export default Waiting;
