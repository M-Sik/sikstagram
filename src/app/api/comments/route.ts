import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/util/session';

// 좋아요에 대한 데이터를 수정할 것이기에 PUT
export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    // req body에 내용을 json으로 풀어서 가져옴
    const { postId, comment } = await req.json();

    if (!postId || comment === undefined) return new Response('Bad Request', { status: 400 });

    return addComment(postId, user.id, comment)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
