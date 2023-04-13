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
          <ColorButton text="Sign in" onClick={() => {}} />
        </ul>
      </nav>
    </div>
  );
}
