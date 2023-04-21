import { User } from '@/types/types';
import React from 'react';
import Avatar from '../avaters/Avatar';

interface IProps {
  user: User;
}

export default function SideBar({ user: { name, username, image } }: IProps) {
  return (
    <article className=" !sticky top-[84px]">
      <div className="flex items-center ">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About • Help • Press • API • Jobs • Privacy • Terms • Location • Languege
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">@Copyright SIKSTAGRAM from SIK</p>
    </article>
  );
}
