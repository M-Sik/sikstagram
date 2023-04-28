import { FullPost, SimplePost } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';
import useSWR from 'swr';
import PostUserAvatar from '../avaters/PostUserAvatar';
import ActionBar from '../bars/ActionBar';
import CommentForm from '../forms/CommentForm';
import Avatar from '../avaters/Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetailCard({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { data } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;
  console.log('포스트 상세조회 결과 => ', comments);

  const onPostComment = (comment: string) => {};

  return (
    <section className="flex h-full ">
      <div className=" relative basis-3/5">
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="660px"
          className=" object-cover"
        />
      </div>
      <div className=" basis-2/5 flex flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="h-full border-t p-4 ">
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li key={index} className="flex items-center mb-1">
                <Avatar image={image} size="small" highlight={commentUsername === username} />
                <div className="ml-2">
                  <span className="font-bold mr-1">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={onPostComment} />
      </div>
    </section>
  );
}
