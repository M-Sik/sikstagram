import { SimplePost } from '@/types/types';
import React from 'react';
import Avatar from '../avaters/Avatar';
import Image from 'next/image';
import CommentForm from '../forms/CommentForm';
import ActionBar from '../bars/ActionBar';

interface IProps {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority = false }: IProps) {
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
        priority={priority}
      />
      <ActionBar likes={likes} username={username} text={text} createdAt={createdAt} />
      <CommentForm />
    </article>
  );
}
