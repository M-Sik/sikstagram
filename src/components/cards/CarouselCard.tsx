import React from 'react';

type Props = {
  text: string;
  color: string;
};

export default function CarouselCard({ text, color }: Props) {
  return (
    <div className={`overflow-hidden w-[200px] h-[200px] ${color} flex-shrink-0 cursor-pointer`}>
      <p>{text}</p>
    </div>
  );
}
