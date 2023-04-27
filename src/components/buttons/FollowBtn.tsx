'use client';

import useMe from '@/hooks/useMe';
import { ProfileUser } from '@/types/types';
import React from 'react';

type Props = {
  user: ProfileUser;
};

export default function FollowBtn({ user }: Props) {
  // 1. 유저 페이지가 나의 페이지라면 팔로우 버튼을 보여주면 안됨.
  // 2. 내가 팔로우 한 유저이면 unfollow 버튼이 나와야함
  // 3. 내가 팔로우 하지 않은 유저이면 follow 버튼이 나와야함
  const { username } = user;
  const { user: loggedInUser } = useMe();
  console.log('팔로우 버튼에서 로그인한 유저 정보 받아온 결과 => ', loggedInUser);

  // 로그인한 유저가 있고 그 로그인 한 유저가 내가 아니라면 버튼을 보여줌
  const showBtn = loggedInUser && loggedInUser.username !== username;
  // 로그인한 유저가 있고 그 로그인한 유저가 팔로우를 했으면 true, 아니면 false
  const following =
    loggedInUser && loggedInUser.following.find((item) => item.username === username);
  const btnText = following ? 'Unfollow' : 'Follow';

  return (
    <>
      {showBtn && (
        <button
          className={`border-none rounded-md py-2 px-8 text-white font-bold leading-4 ${
            following ? 'bg-red-500' : 'bg-sky-500'
          }`}
        >
          {btnText}
        </button>
      )}
    </>
  );
}
