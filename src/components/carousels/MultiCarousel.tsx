'use client';

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const MultiCarousel = ({ children }: Props) => {
  const [currentImgOrder, setcCurrentImgOrder] = useState(0);
  const IMG_WIDTH = 200;
  const slideRange = currentImgOrder * IMG_WIDTH;
  useEffect(() => {
    MultiCarouselRef.current.style.transition = 'all 0.5s ease-in-out';
    MultiCarouselRef.current.style.transform = `translateX(-${slideRange}px)`;
  }, [currentImgOrder]);

  const MultiCarouselRef = useRef(null);
  const leftClick = () => {
    if (currentImgOrder === 0) return;
    setcCurrentImgOrder(currentImgOrder - 1);
  };
  const rightClick = () => {
    if (currentImgOrder === 2) return;
    setcCurrentImgOrder(currentImgOrder + 1);
  };
  return (
    <div className="flex">
      <div>
        <button className="mr-4" onClick={leftClick}>
          왼
        </button>
        <button onClick={rightClick}>오</button>
      </div>
      <article className={`bg-black items-center w-[65%] ml-auto overflow-hidden `}>
        <div ref={MultiCarouselRef} className="flex w-full h-full">
          {children}
        </div>
      </article>
    </div>
  );
};

export default MultiCarousel;
