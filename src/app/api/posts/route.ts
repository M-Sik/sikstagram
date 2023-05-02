import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/posts';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log('testesetestet => ', user);
  // 로그인한 유저 정보가 없다면
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return getFollowingPostsOf(user.username).then((data) => NextResponse.json(data));
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log('testesetestet => ', user);
  // 로그인한 유저 정보가 없다면
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  const form = await request.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file') as Blob;

  if (!text || !file) return new Response('Bad Request', { status: 400 });

  return createPost(user.id, text, file).then((data) => NextResponse.json(data));
}
