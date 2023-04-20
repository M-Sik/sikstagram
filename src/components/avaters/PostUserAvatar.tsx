import React from 'react';
import Avatar from './Avatar';

type Props = {
  userImage: string;
  username: string;
};

export default function PostUserAvatar({ userImage, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={userImage} highlight />
      <span className="font-bold text-gray-800 ml-2">{username}</span>
    </div>
  );
}
