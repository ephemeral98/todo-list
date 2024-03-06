'use client';
import { Inter } from 'next/font/google';
import '../globals.css';
import '../../assets/reset.css';
import '@arco-design/web-react/dist/css/arco.css';
import React, { Suspense } from 'react';
import Wrapper from '@/layouts';
import Category from '@cps/Category';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body id="app" className={`${inter.className} app`}>
        <Wrapper style={{ width: '1200px', margin: '0 auto' }}>
          <div slot="left" className="h-full">
            <Suspense>
              <Category />
            </Suspense>
          </div>
          <div slot="main" className="h-full">
            {children}
          </div>
        </Wrapper>
      </body>
    </html>
  );
}
