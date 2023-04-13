'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import React from 'react';
import ColorButton from './ColorButton';

interface IProps {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

export default function GoogleAuthBtn({ providers, callbackUrl }: IProps) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <ColorButton
          key={provider.id}
          text={`Sign In with ${provider.name}`}
          onClick={() => signIn(provider.id, { callbackUrl: callbackUrl })}
          size="big"
        />
      ))}
    </>
  );
}
