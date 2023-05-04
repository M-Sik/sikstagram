'use client';

import { ProfileUser } from '@/types/types';
import React, { useState } from 'react';
import PostIcon from '../icons/PostIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import HeartIcon from '../icons/HeartIcon';
import PostGrid from '../grids/PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: 'posts', icon: <PostIcon />, title: 'User posts' },
  { type: 'saved', icon: <BookmarkIcon className="w-3 h-3" />, title: 'Saved posts' },
  { type: 'liked', icon: <HeartIcon className="w-3 h-3" />, title: 'Liked posts' },
];

export default function UserPosts({ user: { username } }: Props) {
  // 1. 유저가 쓴 포스트를 보여줘야함 /api/users/${username}/posts
  // 2. 사용자가 좋아한 포스트를 가져와야함 /api/users/${username}/liked
  // 3. 북마크(스크랩)한 포스트를 가져와야함 /api/users/${username}/liked
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {tabs.map(({ type, icon, title }) => (
          <li
            className={`mx-12 py-4 cursor-pointer ${
              type === query ? `font-bold border-t-2 border-black` : ``
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100 md:mr-1" aria-label={title}>
              {icon}
            </button>
            <span className=" hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${query}` }}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
