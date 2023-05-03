import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthUser } from '@/types/types';
import { getServerSession } from 'next-auth';

//tip) api마다 user정보를 확인하는데 이를 공통함수로 뽑음
export async function withSessionUser(callback: (user: AuthUser) => Promise<Response>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return callback(user);
}
