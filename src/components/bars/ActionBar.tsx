'use client';

import React, { useState } from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleBtn from '../buttons/ToggleBtn';
import HeartFillIcon from '../icons/HeartFillIcon';
import BookmarkFillIcon from '../icons/BookmarkFillIcon';
import { SimplePost } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '@/hooks/usePosts';
import useMe from '@/hooks/useMe';

interface IPorps {
  post: SimplePost;
}

export default function ActionBar({ post }: IPorps) {
  const { id: postId, likes, username, text, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  // 유저정보를 가져온 뒤 post -> like[]에 해당 유저가 있는지 판단 후 값 부여
  const liked = user ? likes.includes(user.username) : false;
  // 북마크 배열에 postId가 들어있으면 true 아니면 false
  const bookmarked = user?.bookmarks.includes(postId) ?? false;

  const handleLike = (like: boolean) => {
    // 유저가 있다면 setLike
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark(postId, bookmarked);
  };

  return (
    <>
      <div className="flex p-2 justify-between">
        <ToggleBtn
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleBtn
          toggled={bookmarked}
          onToggle={handleBookmark}
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
