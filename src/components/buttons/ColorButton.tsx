import React from 'react';

interface IProps {
  text: string;
  onClick: () => void;
}

export default function ColorButton({ text, onClick }: IProps) {
  return (
    <div className="rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.2rem]">
      <button
        className=" bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
