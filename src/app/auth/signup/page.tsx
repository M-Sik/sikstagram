import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import React from 'react';

type Props = {
  searchParams: {
    email: string;
    name: string;
  };
};

export default async function SignUpPage({ searchParams: { email, name } }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log('회원가입 페이지 세션 => ', session);
  console.log('회원가입 페이지 user정보 => ', user);

  return (
    <div>
      <div>{email}</div>
      <div>{name}</div>
    </div>
  );
}
