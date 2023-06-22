import Header from '@/components/Header/Header.tsx';
import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

function DefaultLayout({ children, title }: AppLayoutProps) {
  return (
    <>
      <Header type="back" bgColor="white" title={title} />
      <div className="mx-[20px] mt-[54px]">{children}</div>
    </>
  );
}

export default DefaultLayout;
