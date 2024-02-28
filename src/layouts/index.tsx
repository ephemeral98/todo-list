'use client';
import { getSlot } from '@/utils';
import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  background-color: skyblue;
  display: flex;
  height: 100vh;

  > aside {
    background-color: tomato;
    flex: 0 0 300px;
  }
`;

const Wrapper: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = (props) => {
  const slots = getSlot(props);
  return (
    <Wrap style={props.style}>
      <aside>{slots.left}</aside>
      <main>{slots.main}</main>
    </Wrap>
  );
};

export default Wrapper;
