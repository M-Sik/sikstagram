import React, { FormEvent, useEffect, useState } from 'react';
import SmileIcon from '../icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };
  return (
    <>
      <hr className="mt-3" />
      <form onSubmit={handleSubmit} className="flex items-center px-2">
        <SmileIcon />
        <input
          className="w-full ml-2 border-none outline-none p-3 rounded-md"
          type="text"
          placeholder="댓글을 작성해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={comment ? false : true}
          className=" text-sm w-20 font-bold text-sky-600 disabled:text-gray-500"
        >
          댓글 작성
        </button>
      </form>
    </>
  );
}
