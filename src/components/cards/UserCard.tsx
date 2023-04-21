import { ProfileUser } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import Avatar from '../avaters/Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user: { name, username, image, followers, following } }: Props) {
  return (
    <Link
      href={`/user/${username}`}
      className="flex items-center mb-3 border border-gray-300 rounded-md p-3 hover:bg-neutral-200"
    >
      <Avatar image={image} />
      <div className="ml-2 text-gray-500">
        <p className="font-bold text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
