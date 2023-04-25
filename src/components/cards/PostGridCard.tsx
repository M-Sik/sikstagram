'use client';

import { SimplePost } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';
import PortalDialog from '../dialogs/PortalDialog';
import PostDialog from '../dialogs/PostDialog';
import PostDetailCard from './PostDetailCard';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const { image, username } = post;
  const { data: session } = useSession();
  const handleOpenPost = () => {
    if (!session) {
      return signIn();
    }
    setOpenDialog(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        className=" object-cover"
        src={image}
        alt={`photo by ${username}`}
        priority={priority}
        onClick={handleOpenPost}
        sizes="800"
        fill
      />
      {openDialog && (
        // tip) 최상위에 팝업을 띄우기 위해 만든 react portal 하위에 children react node를 넣어줘야함
        <PortalDialog>
          <PostDialog onClose={() => setOpenDialog(false)}>
            <PostDetailCard post={post} />
          </PostDialog>
        </PortalDialog>
      )}
    </div>
  );
}
