import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { addBookmark, removeBookmark } from '@/service/user';
import { withSessionUser } from '@/util/session';

// 북마크에 대한 데이터를 수정할 것이기에 PUT
export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    // req body에 내용을 json으로 풀어서 가져옴
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) return new Response('Bad Request', { status: 400 });

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.id, id)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
