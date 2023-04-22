import { AuthUser } from './types';

// tip) OAuth 로그인한 사용자의 정보를 커스텀하기 위한 타입 지정
// 기본 User의 타입에 username 키 추가
declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }
}
