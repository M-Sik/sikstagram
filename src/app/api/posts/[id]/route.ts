import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getPost } from '@/service/posts';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session.user;
  // 로그인한 유저 정보가 없다면
  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
