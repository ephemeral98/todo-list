'use client';
import { Inter } from 'next/font/google';
import '../globals.css';
import '../../assets/reset.css';
import '@arco-design/web-react/dist/css/arco.css';
import React from 'react';
import Wrapper from '@/layouts';
import Category from '@cps/Category';
import { useTodoCategory } from '@/service/useCategoryApi';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { todoCategory, setTodoCategory, loadTodoCategory, refreshTodoCategory, activeCategory } =
    useTodoCategory();

  return (
    <html>
      <body id="app" className={`${inter.className} app`}>
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
          <div slot="main">{children}</div>
        </Wrapper>
      </body>
    </html>
  );
}
