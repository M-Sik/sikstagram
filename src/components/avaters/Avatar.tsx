import React from 'react';

interface IProps {
  image?: string;
}

export default function Avatar({ image }: IProps) {
  return (
    <div className="rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]">
      {/* tip) 넥스트js 에서 제공하는 img태그를 사용하기 위해서는 외부 이미지 링크 사용시 
        config 파일에 등록해야하는데 우리는 구글뿐 아닌 네이버 깃허브 등등을 더 사용할 수 있기에
        외부 도메인을 지정해주기 어려움 그렇기 때문에 기본 img 태그 사용 */}

      {/* 외부 이미지 사용시 x박스가 나올때가 있는데 이는 referrerPolicy="no-referrer" 로 설정하면 됨 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="user profile"
        src={image ?? undefined}
        className=" rounded-full w-9 h-9 aspect-square"
        referrerPolicy="no-referrer"
      ></img>
    </div>
  );
}