import React from 'react';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostDialog({ children, onClose }: Props) {
  return (
    <section
      className=" fixed top-0 left-0 w-full h-full z-40 bg-black/60 flex flex-col justify-center items-center"
      onClick={(e) => {
        // 안에 요소를 클릭한게 아닌 섹션태그를 클릭했을 경우 다이얼로그를 닫는다.
        // section이 배경 태그이기 때문, e.target은 이벤트가 발생한 타겟 태그이며
        // e.currentTarget은 현재 이벤트가 부착된 태그를 가르킨다.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="fixed top-0 right-0 p-4" onClick={() => onClose()}>
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-[90vh] md:h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
