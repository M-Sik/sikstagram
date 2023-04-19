'use client';

import React from 'react';
import useSWR from 'swr';

export default function FollowingBar() {
  // tip) SWR 사용
  const { data, isLoading, error } = useSWR('/api/hello');
  console.log(data);
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me를 호출할것임 -> 사용자의 정보를 얻어옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가져옴(following)
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 ui에 보여줌(image, username)
  return <p>FollowingBar</p>;
}
