'use client';
import { SimplePost } from '@/types/types';
import React from 'react';
import useSWR from 'swr';

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  console.log('포스트 조회 결과 => ', posts);

  return <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>;
}
