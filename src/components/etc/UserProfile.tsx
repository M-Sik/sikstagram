import { ProfileUser } from '@/types/types';
import React from 'react';
import Avatar from '../avaters/Avatar';
import FollowBtn from '../buttons/FollowBtn';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 border-b border-gray-300 md:flex-row">
      <Avatar image={image} highlight size="xlarge" />
      <div className="md:ml-10">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className=" my-2 text-2xl md:mr-8 font-bold">{username}</h1>
          <FollowBtn user={user} />
        </div>
        <ul className="flex gap-4 my-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="mr-1 font-bold">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold text-gray-500 md:text-start">{name}</p>
      </div>
    </section>
  );
}
