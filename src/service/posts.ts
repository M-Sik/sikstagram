import { SimplePost } from '@/types/types';
import { client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type =="post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
        | order(_createdAt desc){
        ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      comments[]{comment, "username": author->username, "image": author->image},
      "id": _id,
      "createdAt": _createdAt
    }`,
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"] | order(_createdAt desc){
    ${simplePostProjection}
  }`,
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      // 포스트 스키마에서 likes[] 배열에 있는 username이 username인 사람만 조회함
      // 즉 포스트에 좋아요를 누른 사람 중 req로 온 username이 있는것을 리턴해줌
      `*[_type == "post" && "${username}" in likes[]->username] | order(_createdAt desc){
      ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      // 포스트 스키마에서 포스트배열들 중 _id가, user스키마에 req키로 받아온 유저의 bookmarks배열에 _ref값이랑 같은것을 가져옴
      `*[_type == "post" && _id 
      in *[_type == "user" && username == "${username}"].bookmarks[]._ref] | order(_createdAt desc){
      ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes.length === 0 ? [] : post.likes,
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId) // postId를 기준으로 패치함(수정)
    .setIfMissing({ likes: [] }) // likes가 없다면 빈 배열로 설정
    .append('likes', [
      {
        // likes 배열에 userId를 추가해줌
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true }); // autoGenerateArrayKeys는 sanity db에 insert될때 자동으로 키를 만들어줌
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client
    .patch(postId) // postId를 기준으로 패치함(수정)
    .setIfMissing({ comments: [] }) // comments가 없다면 빈 배열로 설정
    .append('comments', [
      {
        author: {
          // likes 배열에 userId를 추가해줌
          _ref: userId,
          _type: 'reference',
        },
        comment,
      },
    ])
    .commit({ autoGenerateArrayKeys: true }); // autoGenerateArrayKeys는 sanity db에 insert될때 자동으로 키를 만들어줌
}
