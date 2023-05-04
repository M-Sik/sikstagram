'use client';

import { Comment, SimplePost } from '@/types/types';
import React, { useState } from 'react';
import Image from 'next/image';
import ActionBar from '../bars/ActionBar';
import PortalDialog from '../dialogs/PortalDialog';
import PostDialog from '../dialogs/PostDialog';
import PostDetailCard from './PostDetailCard';
import PostUserAvatar from '../avaters/PostUserAvatar';
import usePosts from '@/hooks/usePosts';

interface IProps {
  post: SimplePost;
  priority?: boolean;
}

export default function PostListCard({ post, priority = false }: IProps) {
  const { userImage, username, image, comments, text } = post;
  const [openDialog, setOpenDialog] = useState(false);
  const { postComment } = usePosts();

  const onPostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200 mt-4">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenDialog(true)}
      />
      <ActionBar post={post} onComment={onPostComment}>
        <p className="mt-2">
          <span className="font-bold mr-2">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className=" font-bold text-sky-700 my-2"
            onClick={() => setOpenDialog(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openDialog && (
        // tip) 최상위에 팝업을 띄우기 위해 만든 react portal 하위에 children react node를 넣어줘야함
        <PortalDialog>
          <PostDialog onClose={() => setOpenDialog(false)}>
            <PostDetailCard post={post} />
          </PostDialog>
        </PortalDialog>
      )}
    </article>
  );
}
