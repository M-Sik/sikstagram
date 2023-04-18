import FollowingBar from '@/components/bars/FollowingBar';
import SideBar from '@/components/bars/SideBar';
import PostList from '@/components/lists/PostList';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  // tip) 서버 컴포넌트에서 OAuth 세션 가져올때 getServerSession 사용
  const session = await getServerSession(authOptions);
  const user = session?.user;
  // 유저가 없다면 로그인된것이 아니기때문에 로그인페이지로 이동
  if (!user) return redirect('/auth/signin');

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4 mx-auto">
      <div className="w-full basis-3/4 ">
        <FollowingBar />
        <PostList />
      </div>
      <div className=" basis-1/4 ">
        <SideBar user={user} />
      </div>
    </section>
  );
}
