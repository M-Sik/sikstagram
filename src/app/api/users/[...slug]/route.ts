import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[]; // slug/slug/slug
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  // slug가 없거나, slug가 배열이 아니거나, 배열의 길이가 2보다 작다면 오류 리턴
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query == 'saved') request = getSavedPostsOf;
  else if (query == 'liked') request = getLikedPostsOf;

  return request(username).then((data) => NextResponse.json(data));
}
