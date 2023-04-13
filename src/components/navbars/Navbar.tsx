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
          {session ? (
            <ColorButton text="Sign out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="Sign in" onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  );
}
