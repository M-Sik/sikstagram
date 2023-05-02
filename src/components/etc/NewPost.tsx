'use client';

import { AuthUser } from '@/types/types';
import React, { ChangeEvent, useState } from 'react';
import PostUserAvatar from '../avaters/PostUserAvatar';
import FilesIcon from '../icons/FilesIcon';
import Image from 'next/image';

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
    <section className="w-full max-w-xl flex flex-col items-center mt-6 p-4">
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className=" flex flex-col w-full mt-2">
        <input
          className="hidden"
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full relative h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-sky-500 border-dashed rounded-md'
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-300/20 pointer-events-none"></div>
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>클릭하거나 이미지를 드래그 앤 드롭 해주세요!</p>
            </div>
          )}
          {file && (
            //   tip) input file url로 변경 URL.createdObjectURL
            <Image className="rounded-md" src={URL.createObjectURL(file)} alt="local file" fill />
          )}
        </label>
        <textarea
          className=" outline-none text-lg p-3 border border-neutral-400 rounded-md mt-2"
          name="text"
          id="input-text"
          rows={10}
          placeholder="Write a caption..."
        ></textarea>
        <button
          className=" bg-sky-500 text-white rounded-md py-2 px-6 mt-6"
          onClick={() => {}}
        >{`등록하기!`}</button>
      </form>
    </section>
  );
}
