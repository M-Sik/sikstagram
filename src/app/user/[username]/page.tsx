import UserPosts from '@/components/etc/UserPosts';
import UserProfile from '@/components/etc/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보를 보여줘야함(username, name, following 숫자, followers 숫자)
  // 하단: 3개의 탭 (posts, liked, bookmarks)
  const user = await getUserForProfile(username);
  console.log('유저페이지 정보 조회 결과 => ', user);
  // 유저정보가 없다면 낫파운드 페이지 보여줌 동일 파일경로에 있음
  if (!user) {
    notFound();
  }

  return (
    <>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </>
  );
}
