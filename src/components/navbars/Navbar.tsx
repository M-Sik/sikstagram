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
    <div>
      <Link href="/">
        <h1>Sikstagram</h1>
      </Link>
      <nav>
        <ul>
          {menu.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
