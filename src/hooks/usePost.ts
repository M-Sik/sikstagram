import useSWR, { useSWRConfig } from 'swr';
import { Comment, FullPost } from '@/types/types';
import { useCallback } from 'react';

async function addComment(postId: string, comment: string) {
  // tip) get요청은 캐싱이 필요할 수 있기에 swr사용, 이외 put. patch, delete등 수정하는 요청은 fetch
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
  }).then((res) => res.json());
}

export default function usePost(postId: string) {
  const { data: post, isLoading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      // 새로운 포스트 객체를 만들고 이는 받아온 포스트 정보에 comments 값을 수정
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts')); // 포스트 정보를 변경 후 전체적인 포스트 내용도 변경해주기 위함
    },
    [post, mutate, globalMutate],
  );

  return { post, isLoading, error, postComment };
}
