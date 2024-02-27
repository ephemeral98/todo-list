'use client';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollList from '@cps/ScrollList';
import Wrapper from '@/layouts';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div slot="left">
        <ScrollList></ScrollList>
      </div>
      <div slot="main">222</div>
    </Wrapper>
  );
};

export default Home;
