import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // 구글 oAuth를 사용하기 위해 구글 프로바이더 적용 키는 구글 클라우드에서 만듬
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
    // ...add more providers here
  ],
  // 커스텀 OAuth 로그인 페이지 구현을 위해 등록
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};
// export default NextAuth(authOptions)

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
