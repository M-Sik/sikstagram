import React from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleBtn from '../buttons/ToggleBtn';
import HeartFillIcon from '../icons/HeartFillIcon';
import BookmarkFillIcon from '../icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/types/types';
import usePosts from '@/hooks/usePosts';
import useMe from '@/hooks/useMe';
import CommentForm from '../forms/CommentForm';

interface IPorps {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
}

export default function ActionBar({ post, children, onComment }: IPorps) {
  const { id: postId, likes, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  // 유저정보를 가져온 뒤 post -> like[]에 해당 유저가 있는지 판단 후 값 부여
  const liked = user ? likes.includes(user.username) : false;
  // 북마크 배열에 postId가 들어있으면 true 아니면 false
  const bookmarked = user?.bookmarks?.includes(postId) ?? false;

  const handleLike = (like: boolean) => {
    // 유저가 있다면 setLike
    user && setLike(post, user.username, like);
  };
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark(postId, bookmarked);
  };
  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
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
        {children}
        <p className="mt-2 text-xs text-gray-700">{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
