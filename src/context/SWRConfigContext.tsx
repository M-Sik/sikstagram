'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface IProps {
  children: React.ReactNode;
}

export default function SWRConfigContext({ children }: IProps) {
  return (
    <SWRConfig
      value={{
        // 어디경로로 보낼지 받아옴, res객체를 json으로 반환까지 컨텍스트에서 공통적으로 해줌
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
