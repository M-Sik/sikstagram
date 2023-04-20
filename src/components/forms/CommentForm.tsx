import React from 'react';
import SmileIcon from '../icons/SmileIcon';

export default function CommentForm() {
  return (
    <>
      <hr className="mt-3 mb-1" />
      <form className="flex items-center px-2">
        <SmileIcon />
        <input
          className="w-full ml-2 border-none outline-none p-3 rounded-md"
          type="text"
          placeholder="댓글을 작성해주세요."
        />
        <button className=" text-sm w-20 font-bold text-sky-600">댓글 작성</button>
      </form>
    </>
  );
}
