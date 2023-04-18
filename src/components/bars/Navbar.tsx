'use client';

import Link from 'next/link';
import React from 'react';
import HomeIcon from '../icons/HomeIcon';
import HomeFillIcon from '../icons/HomeFillIcon';
import SearchIcon from '../icons/SearchIcon';
import SearchFillIcon from '../icons/SearchFillIcon';
import NewIcon from '../icons/NewIcon';
import NewFillIcon from '../icons/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from '../buttons/ColorButton';
// tip) oAuth 사용을 위해 사용 layout.tsx 파일 바디 하위에 AuthContext.tsx 컴포넌트로 감쌋기 때문에 사용 가능
// client 컴포넌트에서만 사용 가능함
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from '../avaters/Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  // session이 있다면 그 안에 user의 정보를 넣어줌
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Sikstagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 p-4 items-center">
          {menu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {/* user 정보가 있다면 && 뒤에꺼 실행 */}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut({ callbackUrl: '/' })} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
