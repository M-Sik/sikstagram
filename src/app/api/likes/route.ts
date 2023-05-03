import { NextRequest, NextResponse } from 'next/server';
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/util/session';

// 좋아요에 대한 데이터를 수정할 것이기에 PUT
export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    // req body에 내용을 json으로 풀어서 가져옴
    const { postId, like } = await req.json();

    if (!postId || like === undefined) return new Response('Bad Request', { status: 400 });

    const request = like ? likePost : dislikePost;

    return request(postId, user.id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
