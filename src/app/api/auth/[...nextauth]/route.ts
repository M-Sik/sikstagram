import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // 구글 oAuth를 사용하기 위해 구글 프로바이더 적용 키는 구글 클라우드에서 만듬
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  // 로그인한 사용자의 정보를 받아오기 위해 callback 사용
  callbacks: {
    // 로그인이 되었을 때 콜백
    async signIn({ user: { id, name, image, email } }) {
      // console.log('로그인 콜백 => ', user);
      if (!email) {
        return false;
      }
      addUser({ id, name: name || '', image, email, username: email.split('@')[0] });
      return true;
    },
    // 세션이 만들어졌을 때 콜백
    async session({ session, token }) {
      // console.log('세션콜백 세션정보 => ', session);
      // console.log('세션콜백 토큰정보 => ', token);
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    // jwt 토큰이 만들어지거나 업데이트 되면 실행되는 함수
    async jwt({ token, user }) {
      console.log('jwt 콜백 token => ', token);
      console.log('jwt 콜백 user => ', user);
      if (user) {
        // 유저 정보가 있다면 token에는 id값이 없기때문에
        // token.id에 user.id 값을 넣어줌
        token.id = user.id;
      }
      return token;
    },
  },
  // 커스텀 OAuth 로그인 페이지 구현을 위해 등록
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
