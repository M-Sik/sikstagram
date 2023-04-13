'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
