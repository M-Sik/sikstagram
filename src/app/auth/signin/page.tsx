import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import OAuthBtn from '@/components/buttons/OAuthBtn';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

interface IProps {
  searchParams: {
    callbackUrl: string;
  };
}
// tip) searchParams 는 next.js가 url에 데이터를 가져올 수 있도록 도와줌
export default async function SigninPage({ searchParams: { callbackUrl } }: IProps) {
  //tip) app/api/auth/[...nextauth]/route 에 있는 authOptions를 가져옴
  const session = await getServerSession(authOptions);
  // 세션이 있다면 /로 리다이렉트
  if (session) return redirect('/');
  // 세션이 없다면 아래로직 수행
  // getProviders()가 null 이라면 {}
  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-[30%]">
      {/* callbackUrl이 없다면 홈으로 이동하기 위함 */}
      <OAuthBtn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
