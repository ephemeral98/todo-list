'use client';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollList from '@cps/ScrollList';
import Wrapper from '@/layouts';
import TodoList from '@/PageComponents/Home/TodoList';
import Category from '@cps/Category';
import 'uno.css';
import { useTodoCategory } from '@/service/useCategoryApi';

const Home: React.FC = () => {
  const { todoCategory, setTodoCategory, loadTodoCategory, refreshTodoCategory, activeCategory } =
    useTodoCategory();

  return (
    <Wrapper style={{ width: '1200px', margin: '0 auto' }}>
      <div slot="left" className="h-full">
        <Category
          todoCategory={todoCategory}
          setTodoCategory={setTodoCategory}
          loadTodoCategory={loadTodoCategory}
          refreshTodoCategory={refreshTodoCategory}
          onAddCategory={() => {}}
        />
      </div>
      <div slot="main">
        <TodoList title={activeCategory?.name || ''} />
      </div>
    </Wrapper>
  );
};

export default Home;
