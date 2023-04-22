import { ProfileUser } from '@/types/types';
import React from 'react';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  return <div>{user.username}</div>;
}
