import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import OAuthBtn from '@/components/buttons/OAuthBtn';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: '로그인',
  description: 'Sikstagram 로그인',
};

interface IProps {
  searchParams: {
    callbackUrl: string;
  };
}
// tip) searchParams 는 next.js가 url에 데이터를 가져올 수 있도록 도와줌
export default async function SignPage({ searchParams: { callbackUrl } }: IProps) {
  //tip) app/api/auth/[...nextauth]/route 에 있는 authOptions를 가져옴
  const session = await getServerSession(authOptions);
  console.log('searchParms => ', callbackUrl);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-[30%]">
      {/* callbackUrl이 없다면 홈으로 이동하기 위함 */}
      <OAuthBtn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
