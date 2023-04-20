import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFollowingPostsOf } from '@/service/posts';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session.user;
  // 로그인한 유저 정보가 없다면
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return getFollowingPostsOf(user.username).then((data) => NextResponse.json(data));
}