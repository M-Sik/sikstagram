import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { dislikePost, likePost } from '@/service/posts';
import { follow, unfollow } from '@/service/user';
import { withSessionUser } from '@/util/session';

// 좋아요에 대한 데이터를 수정할 것이기에 PUT
export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    // req body에 내용을 json으로 풀어서 가져옴
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) return new Response('Bad Request', { status: 400 });

    const request = isFollow ? follow : unfollow;

    return request(user.id, targetId)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
