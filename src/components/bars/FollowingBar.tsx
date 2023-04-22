'use client';

import { HomeUser } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from '../avaters/Avatar';
import ScrollableBar from './ScrollableBar';

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me를 호출할것임 -> 사용자의 정보를 얻어옴
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가져옴(following)
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 ui에 보여줌(image, username)
  // tip) SWR 사용 => user
  const { data, isLoading, error } = useSWR<HomeUser>('/api/me');
  console.log('유저 이름으로 유저정보 조회 결과 => ', data);
  const users = data?.following;
  // const users = undefined;
  // const users = data?.following && [
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  //   ...data?.following,
  // ];
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-gray-500 rounded-md min-h-[120px] overflow-x-auto">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`팔로잉한 유저가 없습니다.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">{username}</p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
