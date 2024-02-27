'use client';
import { getSlot } from '@/utils';
import styled from 'styled-components';

const Wrap = styled.div`
  background-color: skyblue;
  display: flex;

  > aside {
    background-color: tomato;
    flex: 0 0 300px;
  }
`;

const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const slots = getSlot(props);
  return (
    <Wrap>
      <aside>{slots.left}</aside>
      <main>{slots.main}</main>
    </Wrap>
  );
};

export default Wrapper;
