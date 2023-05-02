'use client';

import { AuthUser } from '@/types/types';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import PostUserAvatar from '../avaters/PostUserAvatar';
import FilesIcon from '../icons/FilesIcon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GridLoader } from 'react-spinners';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        // error가 발생하면
        if (!res.ok) return setError(`${res.status} ${res.statusText}`);
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6 p-4">
      {loading && (
        <div className=" absolute inset-0 z-20 pt-[30vh] bg-sky-500/20 text-center">
          <GridLoader color="red" />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">{error}</p>
      )}
      <PostUserAvatar username={username} userImage={image ?? ''} />
      <form className=" flex flex-col w-full mt-2" onSubmit={handleSubmit}>
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
          required
          placeholder="Write a caption..."
          ref={textRef}
        ></textarea>
        <button
          className=" bg-sky-500 text-white rounded-md py-2 px-6 mt-6"
          onClick={() => {}}
        >{`등록하기!`}</button>
      </form>
    </section>
  );
}
