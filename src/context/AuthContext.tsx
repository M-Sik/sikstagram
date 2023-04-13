'use client';

// tip) 하위 페이지들 및 컴포넌트에서 auth에 대한 정보를 사용하기위해
// tip) context로 구현 client 컴포넌트에서만 사용할 수 있음
//  tip) 해당 context는 app -> layout.tsx파일에 body안에서 사용

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
