'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from './ColorButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};
export default function OAuthBtn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={id} className="flex justify-center mt-4">
          <ColorButton
            text={`${name} 로그인`}
            onClick={() => signIn(id, { callbackUrl })}
            size="big"
          />
        </div>
      ))}
    </>
  );
}
