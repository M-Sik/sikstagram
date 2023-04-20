'use client';
import { SimplePost } from '@/types/types';
import React from 'react';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from '../cards/PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } = useSWR<SimplePost[]>('/api/posts');
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
            posts.map((post) => (
              <li key={post.id}>
                <PostListCard post={post} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
