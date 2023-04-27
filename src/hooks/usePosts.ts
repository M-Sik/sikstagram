import useSWR, { useSWRConfig } from 'swr';
import { SimplePost } from '@/types/types';

export default function usePosts() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');

  // tip) 좋아요로 인해 포스트에 정보가 바뀌었으므로 포스트 정보 갱신해줌 ex) mutate('/api/posts')
  const { mutate } = useSWRConfig();
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    // tip) get요청은 캐싱이 필요할 수 있기에 swr사용, 이외 put. patch, delete등 수정하는 요청은 fetch
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate('/api/posts'));
  };

  return { posts, isLoading, error, setLike };
}
