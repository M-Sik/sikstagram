'use client';

import useMe from '@/hooks/useMe';
import { ProfileUser } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowBtn({ user }: Props) {
  // 1. 유저 페이지가 나의 페이지라면 팔로우 버튼을 보여주면 안됨.
  // 2. 내가 팔로우 한 유저이면 unfollow 버튼이 나와야함
  // 3. 내가 팔로우 하지 않은 유저이면 follow 버튼이 나와야함
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  console.log('팔로우 버튼에서 로그인한 유저 정보 받아온 결과 => ', loggedInUser);

  // tip) 데이터 갱신을 위해 router.refash 사용하며, 갱신동안 스피너를 보여주기 위해 아래 코드 사용
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching; // 펜딩이거나 데이터가 팻칭 중이라면 데이터는 업데이트 중이다.

  // 로그인한 유저가 있고 그 로그인 한 유저가 내가 아니라면 버튼을 보여줌
  const showBtn = loggedInUser && loggedInUser.username !== username;
  // 로그인한 유저가 있고 그 로그인한 유저가 팔로우를 했으면 true, 아니면 false
  const following =
    loggedInUser && loggedInUser.following.find((item) => item.username === username);
  const btnText = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true); // 팔로우 데이터 팻칭 시작
    await toggleFollow(user.id, !following);
    setIsFetching(false); // 팔로우 데이터 팻칭 끝
    // tip) 데이터 업데이트에 따른 ssr페이지 데이터 변경을 위해 사용
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {showBtn && (
        <div className=" relative">
          {isUpdating && (
            <div className=" absolute flex items-center justify-center h-full w-full">
              <PulseLoader size={6} />
            </div>
          )}
          <button
            onClick={handleFollow}
            className={`border-none rounded-md disabled:bg-gray-400 py-2 px-8 text-white font-bold leading-4 ${
              following ? 'bg-red-500' : 'bg-sky-500'
            }`}
            disabled={isUpdating}
          >
            {btnText}
          </button>
        </div>
      )}
    </>
  );
}
