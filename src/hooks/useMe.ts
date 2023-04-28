import useSWR from 'swr';
import { HomeUser, SimplePost } from '@/types/types';
import { useCallback } from 'react';

async function updateBookmark(postId: string, bookmark: boolean) {
  // tip) get요청은 캐싱이 필요할 수 있기에 swr사용, 이외 put. patch, delete등 수정하는 요청은 fetch
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  // tip) 좋아요로 인해 포스트에 정보가 바뀌었으므로 포스트 정보 갱신해줌 ex) mutate('/api/posts')
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  // user 정보나 mutate 정보가 바뀔때만 새로운 함수 반환하며 그렇지 않다면 캐싱된 함수 반환
  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark ? [...bookmarks, postId] : bookmarks.filter((item) => item !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        // tip) 비동기 통신 후 포스트 업데이트 결과를 mutate하면 느리게 반영되서
        // useSWR에서 mutate 선언 후 가져와서 사용한다.
        // optimisticData 옵션은 비동기 요청을 하며 바로 UI를 수정하라는 옵션
        optimisticData: newUser,
        // 원래같으면 비동기 처리된 결과로 업데이트를 해주지만
        // optimisticData로 요청과 동시에 ui를 수정할 것이기 때문에
        // updateLike에서 반환된 값을 mutate에 덮어씌우지 않을것이기에 populateCache는 false
        // populateCache는 false로 해야한다.
        populateCache: false,
        revalidate: false,
        // 비동기 처리를 만약 실패할경우 기존 ui로 롤백함 즉, optimisticData 적용을 취소
        rollbackOnError: true,
      });
    },
    [user, mutate],
  );

  return { user, isLoading, error, setBookmark };
}
