import React from 'react';

interface IProps {
  text: string;
  // tip) 사이즈는 small 이나 big 둘중에 하나만 들어올 수 있음
  size?: 'small' | 'big';
  onClick: () => void;
}

export default function ColorButton({ text, onClick, size = 'small' }: IProps) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]
      ${size === 'big' ? 'p-[0.3rem]' : 'p-[0.2rem]'}`}
    >
      <button
        className={`bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90
        ${size === 'big' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base'}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
