import { SimplePost } from '@/types/types';
import React from 'react';
import useSWR from 'swr';
import dynamic from 'next/dynamic';
import PostGridCard from '../cards/PostGridCard';

// 동적 import
const GridLoader = dynamic(() => import('react-spinners').then((lib) => lib.GridLoader), {
  ssr: false,
});

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }) {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);
  console.log('내가 쓴 포스트 조회 결과 => ', posts);

  return (
    <div>
      <div className="flex justify-center">
        {isLoading && <GridLoader className="mt-10" color="red" />}
      </div>

      <ul className=" grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
