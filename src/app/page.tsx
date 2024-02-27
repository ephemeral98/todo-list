'use client';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollList from '@cps/ScrollList';
import Wrapper from '@/layouts';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div slot="left">
        {/* <ScrollList></ScrollList> */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vel quidem iusto cumque quam et quo ab pariatur excepturi asperiores eaque velit voluptatem, sed iste voluptatibus earum deserunt ea est eligendi fugit repellendus quas saepe quae enim. Provident quaerat qui nam, id molestiae dolores atque a, dolorem impedit officia laboriosam accusantium ex neque ullam obcaecati adipisci ut deserunt nesciunt ducimus magni alias doloribus, pariatur recusandae. Aut at maxime dolorum iste illum voluptatum esse aperiam suscipit velit eum vel hic aspernatur dolore expedita temporibus, sed minima rerum asperiores ratione perferendis cupiditate unde, sapiente, minus quod. Voluptatem hic quidem architecto eligendi doloribus.
      </div>
      <div slot="main">222</div>
    </Wrapper>
  );
};

export default Home;
