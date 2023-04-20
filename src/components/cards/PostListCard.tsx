'use client';

import { SimplePost } from '@/types/types';
import React, { useState } from 'react';
import Avatar from '../avaters/Avatar';
import Image from 'next/image';
import CommentForm from '../forms/CommentForm';
import ActionBar from '../bars/ActionBar';
import PortalDialog from '../dialogs/PortalDialog';
import PostDialog from '../dialogs/PostDialog';

interface IProps {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority = false }: IProps) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openDialog, setOpenDialog] = useState(false);

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
        onClick={() => setOpenDialog(true)}
      />
      <ActionBar likes={likes} username={username} text={text} createdAt={createdAt} />
      <CommentForm />
      {openDialog && (
        <PortalDialog>
          <PostDialog onClose={() => setOpenDialog(false)}>
            <div>포스트 상세페이지!!</div>
          </PostDialog>
        </PortalDialog>
      )}
    </article>
  );
}
