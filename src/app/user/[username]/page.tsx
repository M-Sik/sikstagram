import UserPosts from '@/components/etc/UserPosts';
import UserProfile from '@/components/etc/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

type Props = {
  params: {
    username: string;
  };
};

// tip) 아래 userPage 함수와 메타데이터에서 getUserForProfile이라는 같은 함수를 호출하기 때문에
// 캐싱 처리해줌, 인풋 파라미터가 바뀌지 않으면 캐싱해둔 결과를 리턴함
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보를 보여줘야함(username, name, following 숫자, followers 숫자)
  // 하단: 3개의 탭 (posts, liked, bookmarks)
  const user = await getUser(username);
  console.log('유저페이지 정보 조회 결과 => ', user, username);
  // 유저정보가 없다면 낫파운드 페이지 보여줌 동일 파일경로에 있음
  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

// tip) 동적 라우트방식에서의 메타데이터 사용
export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user.name} (@${user.username}) | Sikstagram Photos`,
    description: `${user.name}의 모든 Sikstagram 포스트`,
  };
}
