import React from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { parseDate } from '@/util/date';

interface IPorps {
  likes: string[];
  username: string;
  text: string;
  createdAt: string;
}

export default function ActionBar({ likes, username, text, createdAt }: IPorps) {
  return (
    <>
      <div className="flex p-2 gap-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="p-2">
        <p className="text-sm font-bold">좋아요 {`${likes?.length ?? 0}`}</p>
        <p className="mt-2">
          <span className="font-bold mr-2">{username}</span>
          {text}
        </p>
        <p className="mt-2 text-xs text-gray-700">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
