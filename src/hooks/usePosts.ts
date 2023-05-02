import useSWR from 'swr';
import { Comment, SimplePost } from '@/types/types';
import { useCallback } from 'react';
import { useCacheKeys } from '@/context/CacheKeysContext';

async function updateLike(postId: string, like: boolean) {
  // tip) get요청은 캐싱이 필요할 수 있기에 swr사용, 이외 put. patch, delete등 수정하는 요청은 fetch
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ postId, like }),
  }).then((res) => res.json());
}
async function addComment(postId: string, comment: string) {
  // tip) get요청은 캐싱이 필요할 수 있기에 swr사용, 이외 put. patch, delete등 수정하는 요청은 fetch
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  // tip) 좋아요로 인해 포스트에 정보가 바뀌었으므로 포스트 정보 갱신해줌 ex) mutate('/api/posts')
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      // 새로운 포스트 객체를 만들고 이는 받아온 포스트 정보에 likes값을 수정
      const newPost = {
        ...post,
        likes: like ? [...post.likes, username] : post.likes.filter((item) => item !== username),
      };
      // 수정한 포스트를 전체 포스트에서 비교하여 수정한 포스트일 경우 newPost로 데이터 업데이트
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        // tip) 비동기 통신 후 포스트 업데이트 결과를 mutate하면 느리게 반영되서
        // useSWR에서 mutate 선언 후 가져와서 사용한다.
        // optimisticData 옵션은 비동기 요청을 하며 바로 UI를 수정하라는 옵션
        optimisticData: newPosts,
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
    [posts, mutate],
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      // 새로운 포스트 객체를 만들고 이는 받아온 포스트 정보에 comments 값을 수정
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      // 수정한 포스트를 전체 포스트에서 비교하여 수정한 포스트일 경우 newPost로 데이터 업데이트
      const newPosts = posts?.map((prevPost) => (prevPost.id === post.id ? newPost : prevPost));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate],
  );

  return { posts, isLoading, error, setLike, postComment };
}
