import CarouselCard from '@/components/cards/CarouselCard';

import MultiCarousel from '@/components/carousels/MultiCarousel';
import React from 'react';

export default function Slider() {
  const cardList = [
    {
      text: '3123',
      color: 'bg-red-900',
    },
    {
      text: '3123',
      color: 'bg-blue-900',
    },
    {
      text: '3123',
      color: 'bg-green-900',
    },
    {
      text: '3123',
      color: 'bg-gray-900',
    },
    {
      text: '3123',
      color: 'bg-white',
    },
    {
      text: '3123',
      color: 'bg-yellow-900',
    },
  ];
  return (
    <section className="w-full flex flex-col md:flex-row max-w-[1200px] mx-auto bg-red-300">
      <MultiCarousel>
        {cardList.length > 0 &&
          cardList.map((card, index) => (
            <CarouselCard key={index} text={card.text} color={card.color} />
          ))}
      </MultiCarousel>
    </section>
  );
}
