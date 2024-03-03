import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="layouts">
      <div>我只是外科</div>
      {children}
    </div>
  );
}