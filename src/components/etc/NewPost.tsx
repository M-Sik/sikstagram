'use client';

import { AuthUser } from '@/types/types';
import React, { ChangeEvent, useState } from 'react';
import PostUserAvatar from '../avaters/PostUserAvatar';
import FilesIcon from '../icons/FilesIcon';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log('파일 업로드 결과 => ', files[0]);
    }
  };

  return (
    <section>
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form>
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>클릭하거나 이미지를 드래그 앤 드롭 해주세요!</p>
        </label>
        <textarea name="text" id="input-text" rows={10} placeholder="Write a caption..."></textarea>
        <button
          className=" bg-sky-500 text-white rounded-md py-2 px-6"
          onClick={() => {}}
        >{`등록하기!`}</button>
      </form>
    </section>
  );
}
