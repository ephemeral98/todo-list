'use client';
import { getSlot } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import initRem from '@/utils/initRem';

const Wrap = styled.div`
  background-color: #87cfeb89;
  display: flex;
  height: 100vh;

  > aside {
    background-color: #ff63476e;
    flex: 0 0 300px;
  }

  > main {
    flex: auto;
  }
`;

const Wrapper: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = (props) => {
  const slots = getSlot(props);
  useEffect(() => {
    initRem();
  }, []);

  return (
    <Wrap style={props.style}>
      <aside>{slots.left}</aside>
      <main>{slots.main}</main>
    </Wrap>
  );
};

export default Wrapper;
