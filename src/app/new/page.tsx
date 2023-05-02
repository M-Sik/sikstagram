import NewPost from '@/components/etc/NewPost';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: '새로운 포스트',
  description: '새로운 포스트를 만들어보세요!',
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/signin');

  return <NewPost user={session.user}></NewPost>;
}
