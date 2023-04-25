import CarouselCard from '@/components/cards/CarouselCard';
import MultiCarousel from '@/components/carousels/MultiCarousel';
import UserSearch from '@/components/etc/UserSearch';
import React from 'react';

// tip) tip) 해당 api는 req값이 없고 get 메서드에 next에서 제공한 fetch 함수를 사용하지 않아서
// ssr이 아닌 static한 ssg이다. 사용자 검색에 있어 빌드 후에 가입한 사용자도 보여야하기 때문에 ssr방식으로 구현해야하며
// 아래 키워드로 해결 가능하다. 해당 api라우트와 해당 api를 사용하는 페이지 이 두곳에 같은 설정을 해야한다.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: '사용자 검색',
  description: '팔로우할 사용자를 찾아주세요!',
};

export default function SearchPage() {
  return <UserSearch />;
}
