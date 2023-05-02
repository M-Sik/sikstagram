import { Comment, SimplePost } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import PostUserAvatar from '../avaters/PostUserAvatar';
import ActionBar from '../bars/ActionBar';
import Avatar from '../avaters/Avatar';
import usePost from '@/hooks/usePost';

type Props = {
  post: SimplePost;
};

export default function PostDetailCard({ post }: Props) {
  const { id: postId, userImage, username, image } = post;
  const { post: data, postComment } = usePost(postId);
  const comments = data?.comments;
  console.log('포스트 상세조회 결과 => ', comments);

  return (
    <section className="flex flex-col md:flex-row h-full ">
      <div className=" relative basis-3/5 max-[768px]:basis-2/6 ">
        <Image
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="660px"
          className=" object-cover max-[768px]:max-h-[200px]"
        />
      </div>
      <div className=" md:basis-2/5 flex flex-col  md:mt-0">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="h-[35vh] md:h-full border-t p-4 overflow-y-scroll">
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
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
