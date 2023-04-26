'use client';

import React, { useState } from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleBtn from '../buttons/ToggleBtn';
import HeartFillIcon from '../icons/HeartFillIcon';
import BookmarkFillIcon from '../icons/BookmarkFillIcon';

interface IPorps {
  likes: string[];
  username: string;
  text?: string;
  createdAt: string;
}

export default function ActionBar({ likes, username, text, createdAt }: IPorps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      <div className="flex p-2 justify-between">
        <ToggleBtn
          toggled={liked}
          onToggle={setLiked}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleBtn
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="p-2">
        <p className="text-sm font-bold">좋아요 {`${likes?.length ?? 0}`}</p>
        {text && (
          <p className="mt-2">
            <span className="font-bold mr-2">{username}</span>
            {text}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-700">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
