import { SimplePost } from '@/types/types';
import React from 'react';
import Avatar from '../avaters/Avatar';
import Image from 'next/image';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import SmileIcon from '../icons/SmileIcon';

interface IProps {
  post: SimplePost;
}

export default function PostListCard({ post }: IProps) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="rounded-lg shadow-md border border-gray-200 mt-4">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight />
        <span className="font-bold text-gray-800 ml-2">{username}</span>
      </div>
      <Image
        className="w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
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
        <hr className="mt-3 mb-1" />
        <form className="flex items-center rounded-md">
          <SmileIcon />
          <input
            className="w-full ml-2 border-none outline-none p-3 rounded-md"
            type="text"
            placeholder="댓글을 작성해주세요."
          />
          <button className=" text-sm w-20 font-bold text-sky-600">댓글 작성</button>
        </form>
      </div>
    </article>
  );
}
