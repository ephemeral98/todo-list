import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="layouts">
      <div>我只是盒子盒子盒子外科</div>
      {children}
    </div>
  );
}
