import reactDom from 'react-dom';

interface IProps {
  children: React.ReactNode;
}

export default function PortalDialog({ children }: IProps) {
  // 브라우저환경이 아니라면 return null, 즉 서버사이드렌더링이 아닌 클라이언트 사이드 렌더링어야함
  if (typeof window === 'undefined') return null;
  // layout.tsx 에 있는 id = portal을 참조
  const node = document.getElementById('portal') as Element;

  return reactDom.createPortal(children, node);
}
