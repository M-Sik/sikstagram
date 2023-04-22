'use client';

import { ProfileUser } from '@/types/types';
import React, { useState } from 'react';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { username } }: Props) {
  // 1. 유저가 쓴 포스트를 보여줘야함 /api/users/${username}/posts
  // 2. 사용자가 좋아한 포스트를 가져와야함 /api/users/${username}/liked
  // 3. 북마크(스크랩)한 포스트를 가져와야함 /api/users/${username}/liked
  const [tab, setTab] = useState('liked');
  const { data: posts, isLoading, error } = useSWR(`/api/users/${username}/${tab}`);
  console.log('내가 쓴 포스트 조회 결과 => ', posts);

  return <div>UserPosts</div>;
}
