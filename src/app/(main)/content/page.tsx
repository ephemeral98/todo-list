'use client';
import 'uno.css';
import ContentHeader from './components/Header';
import { Suspense, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const ContentWrap = styled.div`
  padding: 20px 10px;
  height: 100%;

  .write-todo {
    margin-top: 10rem;
    height: calc(100vh - 40px - 50rem);
    background-color: #f3f4f6;
    font-size: 20rem;
    padding: 18rem;
    border-radius: 7px;
  }
`;

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
    <ContentWrap>
      <Suspense>
        <ContentHeader />
      </Suspense>
      <div className="write-todo" contentEditable ref={contentRef}></div>
    </ContentWrap>
  );
};

export default Content;
