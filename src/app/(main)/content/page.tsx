'use client';
import 'uno.css';
import ContentHeader from './components/Header';
import { useEffect, useRef, useState } from 'react';

const Content: React.FC = () => {
  const [todoContent, setTodoContent] = useState({
    time: '1723467183',
    text: '   11我是内容啊   6666   ',
  });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current!.innerHTML = todoContent.text;
  }, []);

  return (
    <div>
      <ContentHeader />
      <div contentEditable ref={contentRef}></div>
    </div>
  );
};

export default Content;
