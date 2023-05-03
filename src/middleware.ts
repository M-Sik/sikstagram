import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// tip) 특정 페이지에 들어왓거나 특정 api를 실행했을 때 실행할 미들웨어
// user정보를 가지고 있는지 판단함
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // next auth에서 가저온 token이 없다면 로그인하지 않았다는것
  if (!token) {
    // 로그인하지 않고 api를 호출하였다면 401 return
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signIn`, origin);
    signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
// tip) 아래 경로에서만 미들웨어 실행
export const config = {
  matcher: [
    '/new',
    '/',
    '/api/bookmarks',
    '/api/comments',
    '/api/likes',
    '/api/follow',
    '/api/me',
    '/api/posts/:path*',
  ],
};
