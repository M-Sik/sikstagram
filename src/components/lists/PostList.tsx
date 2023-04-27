'use client';
import React from 'react';
import PostListCard from '../cards/PostListCard';
import dynamic from 'next/dynamic';
import usePosts from '@/hooks/usePosts';

// tip) 동적 import
const GridLoader = dynamic(() => import('react-spinners').then((lib) => lib.GridLoader), {
  ssr: false,
});

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  console.log('포스트 조회 결과 => ', posts);

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridLoader color="red" />
        </div>
      )}
      {
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id}>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
