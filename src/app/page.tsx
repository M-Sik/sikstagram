import FollowingBar from '@/components/bars/FollowingBar';
import SideBar from '@/components/bars/SideBar';
import PostList from '@/components/lists/PostList';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  // tip) 서버 컴포넌트에서 OAuth 세션 가져올때 getServerSession 사용
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // 유저가 없다면 로그인된것이 아니기때문에 로그인페이지로 이동
  if (!user) redirect('/auth/signin');

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4 mx-auto">
      <div className="w-full basis-3/4 min-w-0">
        <FollowingBar />
        <PostList />
      </div>
      <div className="  ml-8 h-full">
        <SideBar user={user} />
      </div>
    </section>
  );
}
